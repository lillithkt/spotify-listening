import sdk, { sdkWithToken } from '$lib/server/spotify/index';
import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { error, text, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	console.log(sdk.sdk);
	if (sdk.sdk) return error(400, 'Already authenticated');
	const token: AccessToken = await request.json();
	sdkWithToken(token);
	return text('Authenticated');
};
