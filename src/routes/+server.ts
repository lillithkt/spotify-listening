import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.sdk) return error(400, 'Not authenticated');
	try {
		return json(await locals.getPlaybackState());
	} catch (e) {
		return error(500, (e as Error).message);
	}
};
