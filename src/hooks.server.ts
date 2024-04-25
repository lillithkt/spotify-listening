import { USERNAME } from '$env/static/private';
import type { NotPlayingPlaybackState, PlaybackState } from '$lib/types/PlaybackState';
import type { SpotifyApi } from '@spotify/web-api-ts-sdk';
import type { Handle } from '@sveltejs/kit';

let sdk: SpotifyApi | undefined = undefined;
let nowPlaying: PlaybackState | undefined = undefined;
let lastFetch = 0;

function setSdk(newSdk: SpotifyApi) {
	sdk = newSdk;
}

async function getPlaybackState(): Promise<PlaybackState | NotPlayingPlaybackState> {
	const now = Date.now();
	if (nowPlaying && now - lastFetch < 5000) {
		return nowPlaying;
	}
	const np = await sdk?.player.getCurrentlyPlayingTrack();
	if (!np)
		return {
			item: null,
			is_playing: false
		} as NotPlayingPlaybackState;
	nowPlaying = JSON.parse(JSON.stringify(np).replace(new RegExp(USERNAME, 'g'), '<redacted>'));
	lastFetch = now;
	if (nowPlaying && nowPlaying.item && nowPlaying.is_playing) {
		const timeLeft = nowPlaying.item.duration_ms - nowPlaying.progress_ms;
		if (timeLeft < 5000) {
			lastFetch = now - timeLeft - 5000;
		}
	}

	return nowPlaying!;
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals = {
		sdk,
		setSdk,
		getPlaybackState
	};

	event.locals.sdk = sdk;
	event.locals.setSdk = (newSdk: SpotifyApi) => {
		sdk = newSdk;
	};

	const response = await resolve(event);
	response.headers.append('Access-Control-Allow-Origin', '*');
	response.headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
	response.headers.append('Access-Control-Allow-Headers', 'Content-Type');
	return response;
};
