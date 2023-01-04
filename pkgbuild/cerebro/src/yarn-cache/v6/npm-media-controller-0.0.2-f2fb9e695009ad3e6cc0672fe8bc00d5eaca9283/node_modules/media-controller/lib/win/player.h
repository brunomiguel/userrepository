#ifndef AA9DD84A_49C7_49B5_8769_90AB233D7F36
#define AA9DD84A_49C7_49B5_8769_90AB233D7F36

#include <napi.h>
#include <winrt/Windows.Media.Playback.h>

class Player : public Napi::ObjectWrap<Player> {
public:
  Player(const Napi::CallbackInfo &info);
  static Napi::Object Init(Napi::Env env, Napi::Object exports);

private:
  std::optional<winrt::Windows::Media::Playback::MediaPlayer> mediaPlayer;

  Napi::Value getPlayer(const Napi::CallbackInfo &info);
  Napi::Value createPlayer(const Napi::CallbackInfo &info);
  Napi::Value updatePlayerDetails(const Napi::CallbackInfo &info);
  Napi::Value setButtonStatus(const Napi::CallbackInfo &info);
  Napi::Value setButtonPressCallback(const Napi::CallbackInfo &info);
  Napi::Value setPlaybackStatus(const Napi::CallbackInfo &info);
  Napi::Value getButtonStatus(const Napi::CallbackInfo &info);
  Napi::Value getPlaybackStatus(const Napi::CallbackInfo &info);

  bool playerCreated;
};

#endif // AA9DD84A_49C7_49B5_8769_90AB233D7F36
