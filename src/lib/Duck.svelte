<script>
	import { fade, fly } from 'svelte/transition';

	import { onMount } from 'svelte';
	/**
	 * @type {number}
	 */
	let x;
	/**
	 * @type {number}
	 */
	let y;

	let visible = false;

	/**
	 * @type {HTMLAudioElement}
	 */
	let audio;

	$: {
		if (visible) {
			setTimeout(() => {
				visible = false;
			}, 1500);
		} else {
			setTimeout(() => {
				coords.x = Math.random() * x;
				coords.y = Math.random() * y;
				visible = true;
				if (audio) {
                    audio.play();
                }
			}, Math.random() * 60000);
		}
	}
	let coords = { x: 0, y: 0 };

	setInterval(() => {});

	onMount(() => {
		visible = false;
        audio.volume = 40
	});
</script>

<svelte:window bind:innerHeight={y} bind:innerWidth={x} />

<div>
	<audio bind:this={audio}>
		<source src="audio/duck.mp3" />
	</audio>
	{#if visible}
		<div
			class="duck"
			style:top={coords.y + 'px'}
			style:left={coords.x + 'px'}
			in:fly={{ x: 500, y: 200, duration: 1000 }}
			out:fly={{ x: -500, y: -200, duration: 1000 }}
		>
			🦆
		</div>
	{/if}
</div>

<style>
	.duck {
		position: fixed;
		font-size: 70px;
		user-select: none;
	}
</style>
