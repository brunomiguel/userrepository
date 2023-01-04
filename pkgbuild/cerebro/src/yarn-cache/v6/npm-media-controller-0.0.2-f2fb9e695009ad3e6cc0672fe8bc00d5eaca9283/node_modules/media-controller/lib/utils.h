#ifndef DEFE39C9_0DE6_4DBD_A2C7_0D7CFEBCE2D5
#define DEFE39C9_0DE6_4DBD_A2C7_0D7CFEBCE2D5

#include <napi.h>
#include <optional>

template <typename T>
std::optional<T> getValueIfNotNull(Napi::Object obj, std::string key) {
	auto item = obj.Get(key);
	if (item.IsUndefined() || item.IsNull()) {
		return {};
	}

	return item.As<T>();
}

bool getBool(Napi::Object obj, std::string key);

bool isNetworkUri(std::string uri);

struct MediaInfo {
    std::optional<Napi::String> Title;
    std::optional<Napi::String> ArtistName;
    std::optional<Napi::String> AlbumName;
    std::optional<Napi::String> AlbumArtist;
    std::optional<Napi::String> Thumbnail;
    std::optional<Napi::Array> Genres;
};

MediaInfo toMediaInfo(Napi::Object obj);

#endif // DEFE39C9_0DE6_4DBD_A2C7_0D7CFEBCE2D5
