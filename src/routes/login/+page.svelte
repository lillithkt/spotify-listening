<div class="root">
	<button onclick={() => (window.location.pathname = '/auth')}>Login</button>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	.root {
		width: 100vw;
		height: 100vh;
		background-color: #333;
		display: flex;
		flex-direction: column;

		justify-content: center;
		justify-items: center;
		align-items: center;
	}

	button {
		width: 10%;
		height: 6%;
		background-color: #777;
		border: none;
		border-radius: 10px;
	}
</style>
