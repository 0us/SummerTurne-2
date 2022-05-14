<script>
	import { onMount } from 'svelte';
	import { init } from './wave/index.js';

	const canvasId = 'wave-canvas';

	onMount(() => {
		// Using entire width of parent
		const container = document.getElementById('wave-container');
		const height = container?.clientHeight;
		const width = container?.clientWidth;

		init(canvasId, window, height, width);
	});
</script>

<div id="wave-container">
	<canvas id="wave-canvas" />
</div>

<style>
	#wave-container {
		width: 98%;
		height: 20rem;

		margin-bottom: 1rem;

		position: absolute;
		bottom: 0;
	}
</style>
