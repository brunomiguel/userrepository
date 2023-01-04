use std::{path::PathBuf, str::FromStr};

use librespot::{
    connect::config::ConnectConfig,
    core::{cache::Cache, spotify_id::SpotifyId, token::Token},
    discovery::{Credentials, DeviceType},
    playback::{
        config::{Bitrate, NormalisationMethod, NormalisationType, PlayerConfig},
        dither::{mk_ditherer, TriangularDitherer},
        player::PlayerEvent,
    },
    protocol::authentication::AuthenticationType,
};
use neon::{
    prelude::{Context, FunctionContext, Handle, Object},
    result::Throw,
    types::{JsArray, JsBoolean, JsNumber, JsObject, JsString, JsValue, Value},
};

use crate::canvaz::EntityCanvazResponse;

pub fn create_js_obj_from_canvas<'a, C>(
    mut cx: C,
    data: EntityCanvazResponse,
) -> (Handle<'a, JsObject>, C)
where
    C: Context<'a>,
{
    let canvas_arr = cx.empty_array();

    for (i, c) in data.canvases.iter().enumerate() {
        let mut artist = StructToObj::new(cx);
        artist.add_string("uri", c.artist.uri.clone());
        artist.add_string("name", c.artist.name.clone());
        artist.add_string("avatar", c.artist.avatar.clone());

        let artist_obj = artist.finalize();

        cx = artist.context;

        let mut inner = StructToObj::new(cx);
        inner.add_string("id", c.id.clone());
        inner.add_string("url", c.url.clone());
        inner.add_string("file_id", c.file_id.clone());
        inner.add_string("entity_uri", c.entity_uri.clone());
        inner.add_bool("explicit", c.explicit);
        inner.add_string("uploaded_by", c.uploaded_by.clone());
        inner.add_string("etag", c.etag.clone());
        inner.add_string("canvas_uri", c.canvas_uri.clone());
        inner.add_string("storylines_id", c.storylines_id.clone());
        inner.add_number("type_", c.type_.value() as f64);

        inner.add_obj("artist", artist_obj);

        let inner_obj = inner.finalize();
        cx = inner.context;

        canvas_arr.set(&mut cx, i as u32, inner_obj).unwrap();
    }

    let mut obj = StructToObj::new(cx);
    obj.add_array("canvases", canvas_arr);
    obj.add_number("ttl_in_seconds", data.ttl_in_seconds as f64);

    let js_obj = obj.finalize();
    (js_obj, obj.context)
}

pub fn create_js_obj_from_event<'a, C>(cx: C, event: PlayerEvent) -> (Handle<'a, JsObject>, C)
where
    C: Context<'a>,
{
    let mut obj = StructToObj::new(cx);
    match event {
        PlayerEvent::Stopped {
            play_request_id,
            track_id,
        } => obj
            .add_event("Stopped")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id),
        PlayerEvent::Loading {
            play_request_id,
            track_id,
            position_ms,
        } => obj
            .add_event("Loading")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id)
            .add_u64("position_ms", position_ms as u64),

        PlayerEvent::Preloading { track_id } => obj
            .add_event("Preloading")
            .add_spotify_id("track_id", track_id),
        PlayerEvent::Playing {
            play_request_id,
            track_id,
            position_ms,
        } => obj
            .add_event("Playing")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id)
            .add_u64("position_ms", position_ms as u64),
        PlayerEvent::Paused {
            play_request_id,
            track_id,
            position_ms,
        } => obj
            .add_event("Paused")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id)
            .add_u64("position_ms", position_ms as u64),
        PlayerEvent::TimeToPreloadNextTrack {
            play_request_id,
            track_id,
        } => obj
            .add_event("TimeToPreloadNextTrack")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id),
        PlayerEvent::EndOfTrack {
            play_request_id,
            track_id,
        } => obj
            .add_event("EndOfTrack")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id),
        PlayerEvent::Unavailable {
            play_request_id,
            track_id,
        } => obj
            .add_event("Unavailable")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id),
        PlayerEvent::VolumeChanged { volume } => obj
            .add_event("VolumeChanged")
            .add_u64("volume", volume as u64),
        PlayerEvent::PositionCorrection {
            play_request_id,
            track_id,
            position_ms,
        } => obj
            .add_event("PositionCorrection")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id)
            .add_u64("position_ms", position_ms as u64),
        PlayerEvent::Seeked {
            play_request_id,
            track_id,
            position_ms,
        } => obj
            .add_event("Seeked")
            .add_u64("play_request_id", play_request_id)
            .add_spotify_id("track_id", track_id)
            .add_u64("position_ms", position_ms as u64),
        PlayerEvent::TrackChanged { audio_item } => obj
            .add_event("TrackChanged")
            .add_string("audio_item", audio_item.track_id.to_string()),

        PlayerEvent::SessionConnected {
            connection_id,
            user_name,
        } => obj
            .add_event("SessionConnected")
            .add_string("connection_id", connection_id)
            .add_string("user_name", user_name),
        PlayerEvent::SessionDisconnected {
            connection_id,
            user_name,
        } => obj
            .add_event("SessionDisconnected")
            .add_string("connection_id", connection_id)
            .add_string("user_name", user_name),
        PlayerEvent::SessionClientChanged {
            client_id,
            client_name,
            client_brand_name,
            client_model_name,
        } => obj
            .add_event("SessionClientChanged")
            .add_string("client_id", client_id)
            .add_string("client_name", client_name)
            .add_string("client_brand_name", client_brand_name)
            .add_string("client_model_name", client_model_name),
        PlayerEvent::ShuffleChanged { shuffle } => {
            obj.add_event("ShuffleChanged").add_bool("shuffle", shuffle)
        }
        PlayerEvent::RepeatChanged { repeat } => {
            obj.add_event("RepeatChanged").add_bool("repeat", repeat)
        }
        PlayerEvent::AutoPlayChanged { auto_play } => obj
            .add_event("AutoPlayChanged")
            .add_bool("auto_play", auto_play),
        PlayerEvent::FilterExplicitContentChanged { filter } => obj
            .add_event("FilterExplicitContentChanged")
            .add_bool("filter", filter),
    };

    let js_obj = obj.finalize();
    return (js_obj, obj.context);
}

pub struct StructToObj<'a, C: Context<'a>> {
    context: C,
    obj: Handle<'a, JsObject>,
}

impl<'a, C: Context<'a>> StructToObj<'a, C> {
    fn new(mut context: C) -> Self {
        let obj = context.empty_object();
        Self { context, obj }
    }

    fn write_to_obj(&mut self, field_name: &str, field_value: Handle<JsValue>) {
        self.obj
            .set(&mut self.context, field_name, field_value)
            .expect(stringify!(
                "Failed to write field name {} to obj",
                field_name
            ));
    }

    pub fn add_event(&mut self, value: &str) -> &mut Self {
        self.add_string("event", value.to_string());
        return self;
    }

    fn add_string(&mut self, field_name: &str, field_value: String) -> &mut Self {
        let val = self.context.string(field_value).as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_bool(&mut self, field_name: &str, field_value: bool) -> &mut Self {
        let val = self
            .context
            .boolean(field_value)
            .as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_spotify_id(&mut self, field_name: &str, field_value: SpotifyId) -> &mut Self {
        let val = self
            .context
            .string(field_value.to_string())
            .as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_number(&mut self, field_name: &str, field_value: f64) -> &mut Self {
        let val = self.context.number(field_value).as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_u64(&mut self, field_name: &str, field_value: u64) -> &mut Self {
        let val = self
            .context
            .number(field_value as f64)
            .as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_u128(&mut self, field_name: &str, field_value: u128) -> &mut Self {
        let val = self
            .context
            .number(field_value as f64)
            .as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_array(&mut self, field_name: &str, field_value: Handle<JsArray>) -> &mut Self {
        let val = field_value.as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn add_obj(&mut self, field_name: &str, field_value: Handle<JsObject>) -> &mut Self {
        let val = field_value.as_value(&mut self.context);
        self.write_to_obj(field_name, val);
        return self;
    }

    fn finalize(&self) -> Handle<'a, JsObject> {
        return self.obj;
    }
}

pub fn token_to_obj<'a, C>(cx: C, token: Token) -> (Handle<'a, JsObject>, C)
where
    C: Context<'a>,
{
    let mut obj = StructToObj::new(cx);
    obj.add_string("access_token", token.access_token)
        .add_string("token_type", token.token_type)
        .add_u128("expires_in", token.expires_in.as_millis())
        .add_string("scopes", token.scopes.join(","));

    let js_obj = obj.finalize();
    let ctx = obj.context;

    return (js_obj, ctx);
}

fn get_auth_type(auth_type: String) -> AuthenticationType {
    match auth_type.as_str() {
        "AUTHENTICATION_USER_PASS" => AuthenticationType::AUTHENTICATION_USER_PASS,
        "AUTHENTICATION_STORED_SPOTIFY_CREDENTIALS" => AuthenticationType::AUTHENTICATION_USER_PASS,
        "AUTHENTICATION_STORED_FACEBOOK_CREDENTIALS" => {
            AuthenticationType::AUTHENTICATION_STORED_FACEBOOK_CREDENTIALS
        }
        "AUTHENTICATION_SPOTIFY_TOKEN" => AuthenticationType::AUTHENTICATION_SPOTIFY_TOKEN,
        "AUTHENTICATION_FACEBOOK_TOKEN" => AuthenticationType::AUTHENTICATION_FACEBOOK_TOKEN,
        _ => AuthenticationType::AUTHENTICATION_USER_PASS,
    }
}

pub fn get_credentials_from_obj(
    cx: &mut FunctionContext,
    obj: Handle<JsObject>,
) -> Result<Credentials, Throw> {
    let auth_config = obj.get::<JsObject, _, _>(cx, "auth")?;
    Ok(Credentials {
        username: auth_config.get::<JsString, _, _>(cx, "username")?.value(cx),
        auth_type: get_auth_type(auth_config.get::<JsString, _, _>(cx, "authType")?.value(cx)),
        auth_data: auth_config
            .get::<JsString, _, _>(cx, "password")?
            .value(cx)
            .into_bytes(),
    })
}

pub fn get_player_config_from_obj(
    cx: &mut FunctionContext,
    obj: Handle<JsObject>,
) -> Result<PlayerConfig, Throw> {
    let normalization_config = obj.get::<JsObject, _, _>(cx, "normalizationConfig")?;

    Ok(PlayerConfig {
        bitrate: Bitrate::from_str(obj.get::<JsString, _, _>(cx, "bitrate")?.value(cx).as_str())
            .unwrap_or_default(),
        gapless: obj.get::<JsBoolean, _, _>(cx, "gapless")?.value(cx),
        passthrough: obj.get::<JsBoolean, _, _>(cx, "passThrough")?.value(cx),
        normalisation: normalization_config
            .get::<JsBoolean, _, _>(cx, "normalization")?
            .value(cx),
        normalisation_type: NormalisationType::from_str(
            normalization_config
                .get::<JsString, _, _>(cx, "normalizationType")?
                .value(cx)
                .as_str(),
        )
        .unwrap_or_default(),
        normalisation_method: NormalisationMethod::from_str(
            normalization_config
                .get::<JsString, _, _>(cx, "normalizationMethod")?
                .value(cx)
                .as_str(),
        )
        .unwrap_or_default(),
        normalisation_pregain_db: normalization_config
            .get::<JsNumber, _, _>(cx, "normalizationPregain")?
            .value(cx),
        normalisation_threshold_dbfs: normalization_config
            .get::<JsNumber, _, _>(cx, "normalizationThreshold")?
            .value(cx),
        normalisation_attack_cf: normalization_config
            .get::<JsNumber, _, _>(cx, "normalizationAttackCF")?
            .value(cx),
        normalisation_release_cf: normalization_config
            .get::<JsNumber, _, _>(cx, "normalizationReleaseCF")?
            .value(cx),
        normalisation_knee_db: normalization_config
            .get::<JsNumber, _, _>(cx, "normalizationKneeDB")?
            .value(cx),
        ditherer: Some(mk_ditherer::<TriangularDitherer>),
    })
}

pub fn get_connect_config_from_obj(
    cx: &mut FunctionContext,
    obj: Handle<JsObject>,
) -> Result<ConnectConfig, Throw> {
    let connect_config = obj.get::<JsObject, _, _>(cx, "connectConfig")?;
    Ok(ConnectConfig {
        name: connect_config.get::<JsString, _, _>(cx, "name")?.value(cx),
        device_type: DeviceType::from_str(
            connect_config
                .get::<JsString, _, _>(cx, "deviceType")?
                .value(cx)
                .as_str(),
        )
        .unwrap_or_default(),
        initial_volume: Some(
            connect_config
                .get::<JsNumber, _, _>(cx, "initialVolume")?
                .value(cx) as u16,
        ),
        has_volume_ctrl: connect_config
            .get::<JsBoolean, _, _>(cx, "hasVolumeControl")?
            .value(cx),
    })
}

fn get_path_from_str(
    cx: &mut FunctionContext,
    obj: Handle<JsObject>,
    key: &str,
) -> Result<Option<PathBuf>, Throw> {
    let str_js = obj.get_value(cx, key)?;
    if str_js.is_a::<JsString, _>(cx) {
        let str = str_js.downcast_or_throw::<JsString, _>(cx)?.value(cx);
        return Ok(Some(
            PathBuf::from_str(str.as_str())
                .or_else(|err| Err(cx.throw_error(err.to_string()).unwrap()))?,
        ));
    }
    Ok(None)
}

pub fn get_cache_config_from_obj(
    cx: &mut FunctionContext,
    obj: Handle<JsObject>,
) -> Result<Cache, Throw> {
    let cache_config = obj
        .get::<JsObject, _, _>(cx, "cache")
        .or_else(|err| Err(cx.throw_error(err.to_string()).unwrap()))?;

    let size_limiter_js = cache_config.get_value(cx, "size_limiter")?;
    let mut size_limiter: Option<u64> = None;
    if size_limiter_js.is_a::<JsNumber, _>(cx) {
        size_limiter = Some(
            size_limiter_js
                .downcast_or_throw::<JsNumber, _>(cx)?
                .value(cx) as u64,
        );
    }
    Ok(Cache::new(
        get_path_from_str(cx, cache_config, "credentials_location")?,
        get_path_from_str(cx, cache_config, "volume_location")?,
        get_path_from_str(cx, cache_config, "audio_location")?,
        size_limiter,
    )
    .or_else(|err| Err(cx.throw_error(err.to_string()).unwrap()))?)
}
