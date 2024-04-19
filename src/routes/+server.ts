import sdk from '$lib/server/spotify';
import nowPlaying from '$lib/server/spotify/nowPlaying';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	if (!sdk.sdk) return error(400, 'Not authenticated');
	try {
		return json(await nowPlaying());
	} catch (e) {
		return error(500, (e as Error).message);
	}
};
