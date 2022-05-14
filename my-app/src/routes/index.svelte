<script context="module">
	export const prerender = true;
</script>

<script>
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

	var counter = 0
	let /** @type {Boid[]} */ boids = [...Array(15)].map(() => new Boid(counter++));
</script>

<div on:mousemove={handleMouseMove}>
	<div>DET ER SOMMER I HELE VERDEN</div>

	{#each boids as boid, i}
		<Surfer {mouse} {boid} {boids} startPos={new Victor(i * 40, i)} />
	{/each}
</div>

<style>
	div {
		width: 100%;
		min-height: 100vh;
	}
</style>
