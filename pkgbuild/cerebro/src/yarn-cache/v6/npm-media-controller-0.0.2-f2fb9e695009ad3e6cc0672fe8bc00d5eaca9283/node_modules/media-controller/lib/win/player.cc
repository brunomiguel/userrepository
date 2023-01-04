#define _SILENCE_CLANG_COROUTINE_MESSAGE 1

#include "player.h"
#include "../utils.h"
#include <iostream>
#include <winrt/Windows.Foundation.Collections.h>
#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.Media.Control.h>
#include <winrt/Windows.Storage.Streams.h>
#include <winrt/Windows.Storage.h>

using namespace winrt;
using namespace Windows::Foundation;
using namespace Windows::Storage;
using namespace Windows::Storage::Streams;
using namespace Windows::Media;
using namespace Windows::Media::Playback;
using namespace Windows::Media::Control;

Napi::Object Player::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func = DefineClass(
      env, "Player",
      {InstanceMethod("getPlayer", &Player::getPlayer),
       InstanceMethod("createPlayer", &Player::createPlayer),
       InstanceMethod("updatePlayerDetails", &Player::updatePlayerDetails),
       InstanceMethod("setButtonStatus", &Player::setButtonStatus),
       InstanceMethod("getButtonStatus", &Player::getButtonStatus),
       InstanceMethod("setButtonPressCallback",
                      &Player::setButtonPressCallback),
       InstanceMethod("setPlaybackStatus", &Player::setPlaybackStatus),
       InstanceMethod("getPlaybackStatus", &Player::getPlaybackStatus)});

  Napi::FunctionReference *constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  exports.Set("MediaController", func);
  return exports;
}

Napi::Value Player::setPlaybackStatus(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!this->playerCreated) {
    return env.Null();
  }

  auto val = info[0].ToNumber().Int32Value();
  if (val >= 0 && val <= 4 && this->mediaPlayer.has_value()) {
    const auto systemMediaTransportControls =
        this->mediaPlayer->SystemMediaTransportControls();
    systemMediaTransportControls.PlaybackStatus(
        static_cast<MediaPlaybackStatus>(val));
  }

  return env.Undefined();
}

Napi::Value Player::getPlaybackStatus(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (!this->playerCreated) {
    return env.Null();
  }

  const auto systemMediaTransportControls =
      this->mediaPlayer->SystemMediaTransportControls();

  auto obj = Napi::Object::New(env);
  obj.Set("playbackStatus",
          Napi::Value::From(
              env,
              static_cast<int>(systemMediaTransportControls.PlaybackStatus())));

  return obj;
}

Napi::Value Player::setButtonStatus(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (info.Length() != 1 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!this->playerCreated) {
    return env.Null();
  }

  auto obj = info[0].As<Napi::Object>();

  if (this->mediaPlayer.has_value()) {
    std::cout << "Val " << getBool(obj, "next");

    const auto systemMediaTransportControls =
        this->mediaPlayer->SystemMediaTransportControls();
    systemMediaTransportControls.IsEnabled(true);
    systemMediaTransportControls.IsPlayEnabled(getBool(obj, "play"));
    systemMediaTransportControls.IsPauseEnabled(getBool(obj, "pause"));
    systemMediaTransportControls.IsNextEnabled(getBool(obj, "next"));
    systemMediaTransportControls.IsPreviousEnabled(getBool(obj, "prev"));
  }

  return obj;
}

Napi::Value Player::getButtonStatus(const Napi::CallbackInfo &info) {
  auto env = info.Env();
  if (!this->playerCreated) {
    return env.Null();
  }

  const auto systemMediaTransportControls =
      this->mediaPlayer->SystemMediaTransportControls();

  auto obj = Napi::Object::New(env);
  obj.Set("play", systemMediaTransportControls.IsPlayEnabled());
  obj.Set("pause", systemMediaTransportControls.IsPauseEnabled());
  obj.Set("next", systemMediaTransportControls.IsNextEnabled());
  obj.Set("prev", systemMediaTransportControls.IsPreviousEnabled());
  obj.Set("shuffle", systemMediaTransportControls.ShuffleEnabled());

  return obj;
}

Napi::Value Player::setButtonPressCallback(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (info.Length() != 1 || !info[0].IsFunction()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!this->playerCreated) {
    return env.Null();
  }

  // https://github.com/NyaomiDEV/WinPlayer-Node/blob/master/src/wrapper.cpp#L31
  // Their tears didn't goto waste
  auto tsfn = Napi::ThreadSafeFunction::New(
      info.Env(), info[0].As<Napi::Function>(), "Callback", 0, 1);

  this->mediaPlayer->SystemMediaTransportControls().ButtonPressed(
      [tsfn](SystemMediaTransportControls sender,
             SystemMediaTransportControlsButtonPressedEventArgs args) {
        auto val = static_cast<int32_t>(args.Button());
        auto callback = [val](Napi::Env env, Napi::Function jsCallback) {
          jsCallback.Call({Napi::Number::New(env, val)});
        };
        tsfn.NonBlockingCall(callback);
      });

  return env.Undefined();
}

Player::Player(const Napi::CallbackInfo &info)
    : Napi::ObjectWrap<Player>(info) {
  this->playerCreated = false;
}

Napi::Value Player::createPlayer(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  try {
    auto mediaPlayer = MediaPlayer();
    this->mediaPlayer = mediaPlayer;
    this->playerCreated = true;
  } catch (winrt::hresult_error const &ex) {
    std::cout << "Error while creating media player: "
              << to_string(ex.message()) << std::endl;
  }
  return env.Undefined();
}

Napi::Value Player::updatePlayerDetails(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (info.Length() != 1) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!this->playerCreated) {
    return env.Null();
  }

  const auto mediaInfo = toMediaInfo(info[0].As<Napi::Object>());

  const auto commandManager = this->mediaPlayer->CommandManager();
  commandManager.IsEnabled(false);

  const auto systemMediaTransportControls =
      this->mediaPlayer->SystemMediaTransportControls();
  systemMediaTransportControls.IsEnabled(true);
  systemMediaTransportControls.IsPlayEnabled(true);
  systemMediaTransportControls.IsPauseEnabled(true);
  systemMediaTransportControls.PlaybackStatus(MediaPlaybackStatus::Playing);

  auto updater = systemMediaTransportControls.DisplayUpdater();
  updater.ClearAll();
  updater.Type(MediaPlaybackType::Music);
  auto properties = updater.MusicProperties();

  if (mediaInfo.Title.has_value()) {
    properties.Title(to_hstring(mediaInfo.Title.value().Utf8Value()));
  }

  if (mediaInfo.ArtistName.has_value()) {
    properties.Artist(to_hstring(mediaInfo.ArtistName.value().Utf8Value()));
  }

  if (mediaInfo.AlbumName.has_value()) {
    properties.AlbumTitle(to_hstring(mediaInfo.AlbumName.value().Utf8Value()));
  }

  if (mediaInfo.AlbumArtist.has_value()) {
    properties.AlbumArtist(
        to_hstring(mediaInfo.AlbumArtist.value().Utf8Value()));
  }

  auto genres = properties.Genres();
  genres.Clear();

  if (mediaInfo.Genres.has_value()) {
    for (auto genre : mediaInfo.Genres.value()) {
      genres.Append(to_hstring(
          static_cast<Napi::Value>(genre.second).ToString().Utf8Value()));
    }
  }

  if (mediaInfo.Thumbnail.has_value()) {
    try {
      if (isNetworkUri(mediaInfo.Thumbnail.value().Utf8Value())) {
        updater.Thumbnail(RandomAccessStreamReference::CreateFromUri(
            Uri(to_hstring(mediaInfo.Thumbnail.value().Utf8Value()))));

      } else {
        auto asyncOp = StorageFile::GetFileFromPathAsync(
            to_hstring(mediaInfo.Thumbnail.value().Utf8Value()));
        updater.Thumbnail(
            RandomAccessStreamReference::CreateFromFile(asyncOp.get()));
      }
    } catch (winrt::hresult_error const &ex) {
      std::cout << "Error while fetching file at "
                << mediaInfo.Thumbnail.value().Utf8Value() << ": "
                << to_string(ex.message()) << std::endl;
    }
  }

  updater.Update();

  return env.Undefined();
}

Napi::Value Player::getPlayer(const Napi::CallbackInfo &info) {
  auto env = info.Env();

  if (!this->playerCreated) {
    return env.Null();
  }

  auto sessionManager =
      GlobalSystemMediaTransportControlsSessionManager::RequestAsync().get();

  auto current = sessionManager.GetCurrentSession();
  if (current != NULL) {
    return Napi::String::New(env, to_string(current.SourceAppUserModelId()));
  }

  return env.Undefined();
}