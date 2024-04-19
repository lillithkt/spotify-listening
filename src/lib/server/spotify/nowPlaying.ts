import sdk from '.';

export default async function nowPlaying() {
	const state = await sdk.sdk?.player.getCurrentlyPlayingTrack();
	return state;
}
