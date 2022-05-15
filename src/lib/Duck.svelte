<script>
	import { fly } from 'svelte/transition';

	import { onMount } from 'svelte';
	/**
	 * @type {number}
	 */
	let windowX;
	/**
	 * @type {number}
	 */
	let windowY;

	/**
	 * @type {HTMLAudioElement}
	 */
	let audio;

	let visible = false;
	let coords = { x: 0, y: 0 };

	$: {
		if (visible) {
			setTimeout(() => {
				visible = false;
			}, 1500);
		} else {
			setTimeout(() => {
				coords.x = Math.random() * windowX;
				coords.y = Math.random() * windowY;
				if (audio) {
                    audio.play();
                }
				visible = true;
			}, Math.random() * 60000);
		}
	}

	onMount(() => {
		visible = false;
        audio.volume = 40
	});

    function randomPosX() {
        return randomIn(windowX)
    }

    function randomPosY() {
        return randomIn(windowY)
    }

    function randomIn(number) {
        return (Math.random() - 0.5) * number
    }
</script>

<svelte:window bind:innerHeight={windowY} bind:innerWidth={windowX} />

<div>
	<audio bind:this={audio}>
		<source src="audio/duck.mp3" />
	</audio>
	{#if visible}
		<div
			class="duck"
			style:top={coords.y + 'px'}
			style:left={coords.x + 'px'}
			in:fly={{ x: randomPosX(), y: randomPosY(), opacity: 0.5, duration: 1000 }}
			out:fly={{ x: randomPosX(), y: randomPosY(), duration: 1000 }}
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
