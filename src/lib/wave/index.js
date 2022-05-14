// @ts-nocheck

import { GROUPS, GROUP_EMOJI, RADIUS, SPACING } from './config.js';
import { Particle } from './Particle.js';

/* Settings */
let ctx,
	curWindow,
	width,
	height,
	num_x,
	num_y,
	particles,
	grid,
	meta_ctx,
	threshold = 250,
	play = false,
	textures;

export const init = (canvasId, curWindow, width = 800, height = 376) => {
	console.debug('Starting wave initialization');

	setupWindow(curWindow);
	setupCanvas(canvasId, width, height);
	addTextures();
	setupGrid();
	addParticles();
	startSimulation();
	runSimulation();
};

export const stopSimulation = () => {
	play = false;
};

export const startSimulation = () => {
	play = true;
};

const setupWindow = (newWindow) => {
	console.debug('Setting up window for animations');
	curWindow = newWindow;
	curWindow.requestAnimFrame =
		curWindow.requestAnimationFrame ||
		curWindow.webkitRequestAnimationFrame ||
		curWindow.mozRequestAnimationFrame ||
		curWindow.oRequestAnimationFrame ||
		curWindow.msRequestAnimationFrame ||
		function (callback) {
			curWindow.setTimeout(callback, 1000 / 60);
		};
};

const processImage = () => {
	var imageData = meta_ctx.getImageData(0, 0, width, height),
		pix = imageData.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i + 3] < threshold && (pix[i + 3] /= 6);
	}

	ctx.putImageData(imageData, 0, 0);
};

const runSimulation = () => {
	meta_ctx.clearRect(0, 0, width, height);

	for (var i = 0, l = num_x * num_y; i < l; i++) grid[i].length = 0;

	var rem_particles = particles.length;
	while (rem_particles--) particles[rem_particles].first_process();
	rem_particles = particles.length;
	while (rem_particles--) particles[rem_particles].second_process();

	processImage();

	ctx.canvas.style.cursor = 'default';

	if (play) curWindow.requestAnimFrame(runSimulation);
};

const addParticles = () => {
	for (let groupIndex = 0; groupIndex < GROUPS.length; groupIndex++) {
		for (let i = 0; i < GROUPS[groupIndex]; i++) {
			particles.push(
				new Particle(
					groupIndex,
					RADIUS + Math.random() * (width - RADIUS * 2),
					RADIUS + Math.random() * (height - RADIUS * 2),
					grid,
					num_x,
					width,
					height,
					meta_ctx,
					textures
				)
			);
		}
	}
	console.debug('Done adding particles');
};

const addTextures = () => {
	for (var i = 0; i < GROUPS.length; i++) {
		var colour;

		console.log(colour);

		textures[i] = document.createElement('canvas');
		textures[i].width = RADIUS * 10;
		textures[i].height = RADIUS * 10;

		console.log(textures[i].width, textures[i].height);

		const nctx = textures[i].getContext('2d');

		const emoji = GROUP_EMOJI[i];

		// All values are fine tuned, no touch
		nctx.font = '150px Arial';
		var x = 150 / 4;
		var y = 150 * 1.35;

		nctx.fillStyle = '0,0,0';

		//Use the fillText method to draw the emoji.
		nctx.fillText(emoji, x, y);

		// nctx.fillStyle = 'rgba(0,0,0,0.5)';
		// nctx.fillRect(0, 0, curWindow.innerWidth, curWindow.innerHeight);
	}
	console.debug('Done adding textures');
};

const setupGrid = () => {
	num_x = Math.round(width / SPACING) + 1;
	num_y = Math.round(height / SPACING) + 1;

	// Reset grid
	for (var j = 0; j < num_x * num_y; j++) {
		grid[j] = {
			length: 0,
			close: []
		};
	}
};

const setupCanvas = (canvasId, h, w) => {
	particles = [];
	grid = [];
	textures = [];

	var canvas = document.getElementById(canvasId);
	ctx = canvas.getContext('2d');
	canvas.height = h || curWindow.innerHeight;
	canvas.width = w || curWindow.innerWidth;
	width = canvas.width;
	height = canvas.height;

	var meta_canvas = document.createElement('canvas');
	meta_canvas.width = width;
	meta_canvas.height = height;
	meta_ctx = meta_canvas.getContext('2d');

	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	ctx.fillRect(0, 0, curWindow.innerWidth, curWindow.innerHeight);
};
