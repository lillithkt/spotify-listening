<script lang="ts">
	import { onMount } from 'svelte';
	import { SpotifyApi } from '@spotify/web-api-ts-sdk';
	import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

	onMount(async () => {
		await SpotifyApi.performUserAuthorization(
			PUBLIC_CLIENT_ID,
			PUBLIC_REDIRECT_URI,
			['user-read-currently-playing'],
			async (token) => {
				const res = await fetch('/auth/accept', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(token)
				});
				if (res.status === 200) {
					window.location.pathname = '/';
				} else {
					const error = await res.json();
					console.error(error);
					alert(`Failed to authenticate: ${error.message}`);
				}
			}
		);
	});
</script>
