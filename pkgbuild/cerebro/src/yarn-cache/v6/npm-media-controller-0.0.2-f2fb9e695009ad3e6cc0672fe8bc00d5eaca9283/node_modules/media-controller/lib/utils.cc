#include "utils.h"

bool getBool(Napi::Object obj, std::string key) {
	auto item = obj.Get(key);
	if (item.IsUndefined() || item.IsNull()) {
		return false;
	}

	return item.As<Napi::Boolean>().Value();
}

bool isNetworkUri(std::string uri) {
	return uri.starts_with("http");
}

MediaInfo toMediaInfo(Napi::Object obj) {
	return MediaInfo{
			getValueIfNotNull<Napi::String>(obj, "title"),
			getValueIfNotNull<Napi::String>(obj, "artistName"),
			getValueIfNotNull<Napi::String>(obj, "albumName"),
			getValueIfNotNull<Napi::String>(obj, "albumArtist"),
			getValueIfNotNull<Napi::String>(obj, "thumbnail"),
			getValueIfNotNull<Napi::Array>(obj, "genres")
			};
}