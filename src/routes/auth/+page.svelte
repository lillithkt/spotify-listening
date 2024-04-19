<script lang="ts">
	import { onMount } from 'svelte';
	import { SpotifyApi } from '@spotify/web-api-ts-sdk';
	import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

	onMount(async () => {
		const res = await SpotifyApi.performUserAuthorization(
			PUBLIC_CLIENT_ID,
			PUBLIC_REDIRECT_URI,
			['user-read-currently-playing'],
			'/auth/accept'
		);
		console.log(res);
	});
</script>
