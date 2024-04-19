import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk';

const sdk = {
	sdk: null as SpotifyApi | null
};
export default sdk;
export function sdkWithToken(token: AccessToken) {
	sdk.sdk = SpotifyApi.withAccessToken(PUBLIC_CLIENT_ID, token);
}
