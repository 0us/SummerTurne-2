<script>
	import { fade, fly } from 'svelte/transition';
	import Victor from 'victor';
	// @ts-ignore
	import Boid from '$lib/boid/boid';
	import { onMount, afterUpdate } from 'svelte';
	import { spring } from 'svelte/motion';

	let mouseVector = new Victor(0, 0);
	let coords = spring({ x: 50, y: 50 });

	coords.stiffness = 0.1;
	coords.damping = 0.5;

	$: {
		mouseVector.x = mouse.x;
		mouseVector.y = mouse.y;
		// @ts-ignore
		boid.tick(mouseVector, boids);
		coords.set({
			x: boid.position.x,
			y: boid.position.y
		});
	}

	afterUpdate(() => {
		if (boid.velocity.length() > 1) {
			// force update
			mouse = mouse
		}
	});

	onMount(async () => {
		console.log('Boid Init');
		// @ts-ignore
		boid.position.add(startPos);
		boid = boid;
	});

	export /** @type {Boid} */ let boid;
	export /** @type {Boid[]} */ let boids;
	export /** @type {Victor} */ let startPos;
	export let mouse = { x: 0, y: 0 };

</script>

<div
	class="surfer"
	style:top={$coords.y + 'px'}
	style:left={$coords.x + 'px'}
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
