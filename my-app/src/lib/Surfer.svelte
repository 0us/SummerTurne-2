<script>
	import { fade, fly } from 'svelte/transition';
	import Victor from 'victor';
	// @ts-ignore
	import Boid from '$lib/boid/boid';
	import { onMount } from 'svelte';

	const mouseVector = new Victor(0, 0);

	$: {
		mouseVector.x = mouse.x;
		mouseVector.y = mouse.y;

		// @ts-ignore
		boid.tick(mouseVector, boids);
		boid = boid;
	}

	onMount(async () => {
		console.log('Boid Init');
		// @ts-ignore
		boid.position.add(startPos);
		boid = boid
	});

	export /** @type {Boid} */ let boid;
	export /** @type {Boid[]} */ let boids;
	export /** @type {Victor} */ let startPos;
	export let mouse = { x: 0, y: 0 };
</script>

<div
	class="surfer"
	style:top={boid.position.y + 'px'}
	style:left={boid.position.x + 'px'}
	in:fly={{ y: 200, duration: 2000 }}
>
	🏄
</div>

<style>
	.surfer {
		position: fixed;
		font-size: 35px;
		user-select: none;
	}
</style>
