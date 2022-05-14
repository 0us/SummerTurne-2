<script context="module">
	export const prerender = true;
</script>

<script>
	import '../assets/app.css';

	import Boid from '$lib/boid/boid';
	import Victor from 'victor';
	import Surfer from '$lib/Surfer.svelte';
	import Wave from '$lib/Wave.svelte';

	let mouse = { x: 0, y: 0 };

	/**
	 * @param {{ clientX: any; clientY: any; }} event
	 */
	function handleMouseMove(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}

	var counter = 0;
	let /** @type {Boid[]} */ boids = [...Array(30)].map(() => new Boid(counter++));
</script>

<div id="app-container" on:mousemove={handleMouseMove}>
	<h1 class="main-text">DET ER SOMMER I HELE VERDEN</h1>

	<!-- {#each boids as boid, i}
		<Surfer {mouse} {boid} {boids} startPos={new Victor(i * 40, i)} />
	{/each} -->
	<Wave />
</div>

<style>
	h1 {
		margin: 0;
	}

	#app-container {
		padding: 1rem;
		height: 100%;

		background-image: url('../assets/background.png');
		background-repeat: no-repeat;
		background-color: #59b9f7;
	}

	.main-text {
		position: absolute;

		margin-top: 8rem;

		font-size: 15rem;
		background-image: linear-gradient(to right, #9fe3ef, #b5f4fd);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		user-select: none;
	}
</style>
