use std::{
    sync::mpsc::{self, Receiver},
    thread,
};

use librespot::{
    connect::{config::ConnectConfig, spirc::Spirc},
    core::Error,
    core::{cache::Cache, Session},
    discovery::Credentials,
    playback::{config::PlayerConfig, player::PlayerEventChannel},
};
use neon::{
    prelude::{Channel, Context, Handle, Object},
    result::JsResult,
    types::{Deferred, Finalize, JsFunction, JsUndefined},
};
use tokio::runtime::Builder;

use crate::{
    constants::GLOBAL_JS_CALLBACK_METHOD,
    player::{create_session, new_player},
    utils::create_js_obj_from_event,
};

impl Finalize for JsPlayerSpircWrapper {}

pub struct JsPlayerSpircWrapper {
    tx: mpsc::Sender<Message>,
    device_id: String,
}

pub type Callback = Box<dyn (FnOnce(&mut Spirc, Session, &Channel, Deferred)) + Send>;

pub enum Message {
    Callback(Deferred, Callback),
    Close,
}

impl JsPlayerSpircWrapper {
    pub fn new<'a, C>(
        cx: &mut C,
        credentials: Credentials,
        player_config: PlayerConfig,
        connect_config: ConnectConfig,
        cache_config: Cache,
        backend: String,
    ) -> Result<Self, Error>
    where
        C: Context<'a>,
    {
        let (tx, rx) = mpsc::channel::<Message>();

        let (player_creation_tx, player_creation_rx) = mpsc::channel::<Result<String, Error>>();
        let (close_tx, close_rx) = mpsc::channel::<()>();

        let mut commands_channel = cx.channel();
        commands_channel.unref(cx);

        let mut event_callback_channel = cx.channel();
        event_callback_channel.unref(cx);

        thread::spawn(move || {
            let runtime = Builder::new_multi_thread()
                .enable_io()
                .enable_time()
                .build()
                .unwrap();

            runtime.block_on(async {
                println!("Creating session");
                let session = create_session(cache_config).clone();

                let device_id = session.device_id().to_string();

                let (player, mixer) = new_player(backend, session.clone(), player_config.clone());

                let events_channel = player.get_player_event_channel();

                let res = Spirc::new(
                    connect_config.clone(),
                    session.clone(),
                    credentials.clone(),
                    player,
                    mixer,
                )
                .await;

                match res {
                    Ok((spirc, spirc_task)) => {
                        spirc.activate().unwrap();
                        JsPlayerSpircWrapper::start_player_event_thread(
                            event_callback_channel,
                            events_channel,
                            close_rx,
                        );
                        JsPlayerSpircWrapper::listen_commands(
                            rx,
                            spirc,
                            session.clone(),
                            close_tx,
                            commands_channel,
                        );

                        // Panic thread if send fails
                        player_creation_tx.send(Ok(device_id)).unwrap();

                        spirc_task.await;
                    }
                    Err(e) => player_creation_tx.send(Err(e)).unwrap(),
                }
            })
        });

        let res = player_creation_rx.recv();
        match res.unwrap() {
            Ok(device_id) => return Ok(Self { tx, device_id }),
            Err(e) => Err(e),
        }
    }

    pub fn start_player_event_thread(
        channel: Channel,
        mut event_channel: PlayerEventChannel,
        close_rx: mpsc::Receiver<()>,
    ) {
        thread::spawn(move || loop {
            let close_message = close_rx.try_recv();
            match close_message {
                Ok(_) => break,
                Err(_) => {}
            }

            let message = event_channel.blocking_recv();
            if message.is_some() {
                channel.send(move |mut cx| {
                    let callback: Handle<JsFunction> =
                        cx.global().get(&mut cx, GLOBAL_JS_CALLBACK_METHOD).unwrap();
                    let (obj, mut cx) = create_js_obj_from_event(cx, message.unwrap());
                    let _: JsResult<JsUndefined> =
                        callback.call_with(&mut cx).arg(obj).apply(&mut cx);
                    Ok(())
                });
            }
        });
    }

    pub fn listen_commands(
        rx: Receiver<Message>,
        mut spirc: Spirc,
        session: Session,
        close_tx: mpsc::Sender<()>,
        callback_channel: Channel,
    ) {
        thread::spawn(move || {
            while let Ok(message) = rx.recv() {
                match message {
                    Message::Callback(deferred, f) => {
                        f(&mut spirc, session.clone(), &callback_channel, deferred);
                    }

                    Message::Close => {
                        close_tx.send(()).unwrap();
                        spirc.shutdown().unwrap();
                        break;
                    }
                }
            }
        });
    }

    pub fn close(&self) -> Result<(), mpsc::SendError<Message>> {
        self.tx.send(Message::Close)
    }

    pub fn send(
        &self,
        deferred: Deferred,
        callback: impl (FnOnce(&mut Spirc, Session, &Channel, Deferred)) + Send + 'static,
    ) {
        let res = self
            .tx
            .send(Message::Callback(deferred, Box::new(callback)));
        if res.is_err() {
            panic!(
                "Failed to send command to player {}",
                res.err().unwrap().to_string()
            )
        }
    }

    pub fn get_device_id(&self) -> String {
        self.device_id.clone()
    }
}
