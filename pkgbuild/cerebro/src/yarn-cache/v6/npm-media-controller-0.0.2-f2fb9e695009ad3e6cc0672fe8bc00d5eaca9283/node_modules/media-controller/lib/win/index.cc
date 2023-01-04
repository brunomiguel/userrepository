#include <napi.h>
#include <iostream>
#include "player.h"

Napi::Object Init(Napi::Env env, Napi::Object exports){
	Player::Init(env, exports);
	return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)