<script context="module">
	export const prerender = true;
</script>

<script>
	import '../assets/app.css';

	import Boid from '$lib/boid/boid';
	import Victor from 'victor';
	import Surfer from '$lib/Surfer.svelte';

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
	<div>
		<h1 class="main-text">DET ER SOMMER I HELE VERDEN</h1>
	</div>

	{#each boids as boid, i}
		<Surfer {mouse} {boid} {boids} startPos={new Victor(i * 40, i)} />
	{/each}
</div>

<style>
	h1 {
		margin: 0;
	}

	#app-container {
		padding: 1rem;
		height: 100%;
	}

	.main-text {
		font-size: 15rem;
		background-image: linear-gradient(
			to right,
			#2f61fe,
			#0075fb,
			#0083f0,
			#008ee1,
			#0096cf,
			#28a0cd,
			#44a9ca,
			#5db2c7,
			#74c2d4,
			#8ad3e1,
			#9fe3ef,
			#b5f4fd
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
