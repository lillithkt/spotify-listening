import type { PlaybackState as OrigPlaybackState } from '@spotify/web-api-ts-sdk';

export type PlaybackState = Omit<OrigPlaybackState, 'device'>;
