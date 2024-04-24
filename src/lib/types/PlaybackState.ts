import type { PlaybackState as OrigPlaybackState } from '@spotify/web-api-ts-sdk';

export type PlaybackState = Omit<OrigPlaybackState, 'device'>;
export type NotPlayingPlaybackState = {
	item: null;
	is_playing: false;
};
