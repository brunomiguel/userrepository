use futures_util::StreamExt;

use librespot;
use librespot::core::cache::Cache;
use librespot::core::SpotifyId;
use librespot::core::{authentication::Credentials, config::SessionConfig, session::Session};
use librespot::discovery::DeviceType;

use librespot::playback::audio_backend::SinkBuilder;
use librespot::playback::config::{PlayerConfig, VolumeCtrl};
use librespot::playback::mixer::{Mixer, MixerConfig};
use librespot::playback::player::Player;
use librespot::playback::{audio_backend, mixer};
use neon::prelude::{Context, Handle};
use neon::types::JsError;
use protobuf::Message;
use reqwest::header::{CONTENT_LENGTH, CONTENT_TYPE};
use tokio;

use crate::canvaz::entity_canvaz_request::Entity;
use crate::canvaz::{EntityCanvazRequest, EntityCanvazResponse};

pub fn new_player(
    backend_str: String,
    session: Session,
    player_config: PlayerConfig,
) -> (Player, Box<dyn Mixer>) {
    let backend: SinkBuilder;
    if backend_str.is_empty() {
        backend = audio_backend::find(Some("rodio".to_string())).unwrap();
    } else {
        backend = audio_backend::find(Some(backend_str)).unwrap();
    }
    let mut mixer_config = MixerConfig::default();
    mixer_config.volume_ctrl = VolumeCtrl::Linear;
    let mixer = mixer::find(None).unwrap()(mixer_config);

    let p = Player::new(
        player_config,
        session.clone(),
        mixer.get_soft_volume(),
        move || (backend)(None, librespot::playback::config::AudioFormat::F32),
    );

    return (p, mixer);
}

pub fn create_session(cache_config: Cache) -> Session {
    let session_config = SessionConfig::default();
    let session = Session::new(session_config, Some(cache_config));

    return session;
}

#[allow(dead_code)]
#[tokio::main]
pub async fn start_discovery(client_id: String) -> Credentials {
    let device_id = "test";

    let mut discovery = librespot::discovery::Discovery::builder(device_id, client_id.as_str())
        .name("test device")
        .device_type(DeviceType::Computer)
        .port(9001)
        .launch()
        .unwrap();

    discovery.next().await.unwrap()
}

pub fn get_lyrics<'a, C>(
    cx: &mut C,
    track_uri: String,
    session: Session,
) -> Result<String, Handle<'a, JsError>>
where
    C: Context<'a>,
{
    let session_clone = session.clone();
    let runtime = tokio::runtime::Builder::new_multi_thread()
        .enable_io()
        .enable_time()
        .build()
        .unwrap();

    runtime.block_on(async {
        let track_id_res = SpotifyId::from_uri(track_uri.as_str())
            .or_else(|err| Err(cx.error(err.to_string()).unwrap()))?;

        let resp = session_clone
            .spclient()
            .get_lyrics(&track_id_res)
            .await
            .or_else(|err| Err(cx.error(err.to_string()).unwrap()))?;

        let str = String::from_utf8(resp.to_vec())
            .or_else(|err| Err(cx.error(err.to_string()).unwrap()))?;
        Ok(str)
    })
}

pub fn get_canvas<'a, C>(
    cx: &mut C,
    track_uri: String,
    session: Session,
) -> Result<EntityCanvazResponse, Handle<'a, JsError>>
where
    C: Context<'a>,
{
    let session_clone = session.clone();
    let runtime = tokio::runtime::Builder::new_multi_thread()
        .enable_io()
        .enable_time()
        .build()
        .unwrap();

    runtime.block_on(async {
        let spclient = session_clone.spclient();

        let mut req = EntityCanvazRequest::new();
        let mut entity = Entity::new();
        entity.entity_uri = track_uri.clone();
        req.entities.push(entity.clone());

        println!("{}", protobuf::text_format::print_to_string(&req));

        let url = format!(
            "{}/canvaz-cache/v0/canvases",
            spclient.base_url().await.unwrap()
        );
        let token = session
            .token_provider()
            .get_token("playlist-read")
            .await
            .or_else(|err| {
                Err(cx
                    .error(format!("Failed to get access_token {}", err.to_string()))
                    .unwrap())
            })?
            .access_token;

        let body = req.write_to_bytes().or_else(|err| {
            Err(cx
                .error(format!("Failed write body to bytes {}", err.to_string()))
                .unwrap())
        })?;

        let resp = reqwest::Client::builder()
            .build()
            .or_else(|err| Err(cx.error(format!("Failed to build request builder {}", err))))
            .unwrap()
            .post(url)
            .header(CONTENT_TYPE, "application/x-protobuf")
            .bearer_auth(token)
            .header(CONTENT_LENGTH, body.len())
            .body(body)
            .send()
            .await
            .or_else(|err| {
                Err(cx
                    .error(format!("Failed to send request {}", err.to_string()))
                    .unwrap())
            })?;

        let bytes = resp.bytes().await.or_else(|err| {
            Err(cx
                .error(format!("Failed to get response body {}", err.to_string()))
                .unwrap())
        })?;

        let data = EntityCanvazResponse::parse_from_tokio_bytes(&bytes.clone()).or_else(|err| {
            Err(cx
                .error(format!("Failed to parse request {}", err.to_string()))
                .unwrap())
        })?;

        Ok(data)
    })
}
