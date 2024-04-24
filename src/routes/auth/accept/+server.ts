import { USERNAME } from '$env/static/private';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk';
import { error, text, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (locals.sdk) return error(401, 'Already authenticated');
	const token: AccessToken = await request.json();
	const newSdk = SpotifyApi.withAccessToken(PUBLIC_CLIENT_ID, token);
	const profile = await newSdk.currentUser.profile();
	if (profile.id !== USERNAME) return error(401, 'Invalid user');
	locals.setSdk(newSdk);
	return text('Authenticated');
};
