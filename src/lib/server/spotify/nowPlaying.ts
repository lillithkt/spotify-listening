import type { PlaybackState } from '@spotify/web-api-ts-sdk';
import sdk from '.';

const _ = {
	nowPlaying: undefined as PlaybackState | undefined,
	lastGet: 0
};

export default async function nowPlaying() {
	const now = Date.now();
	if (_.nowPlaying && now - _.lastGet < 5000) {
		return _.nowPlaying;
	}
	_.nowPlaying = await sdk.sdk?.player.getCurrentlyPlayingTrack();
	_.lastGet = now;
	if (_.nowPlaying && _.nowPlaying.item && _.nowPlaying.is_playing) {
		const timeLeft = _.nowPlaying.item.duration_ms - _.nowPlaying.progress_ms;
		if (timeLeft < 5000) {
			_.lastGet = now - timeLeft - 5000;
		}
	}

	return _.nowPlaying;
}
