// See https://kit.svelte.dev/docs/types#app

import type { SpotifyApi } from '@spotify/web-api-ts-sdk';
import type { NotPlayingPlaybackState, PlaybackState } from '$lib/types/PlaybackState';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sdk: SpotifyApi | undefined;
			setSdk: (sdk: SpotifyApi) => void;

			getPlaybackState: () => Promise<PlaybackState | NotPlayingPlaybackState>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
