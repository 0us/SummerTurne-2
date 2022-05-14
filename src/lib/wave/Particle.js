// @ts-nocheck
import { GRAVITY_X, GRAVITY_Y, RADIUS, SPACING } from './config.js';

const limit = RADIUS * 0.56;

export class Particle {
	constructor(type, x, y, grid, num_x, width, height, meta_ctx, textures) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.px = x;
		this.py = y;
		this.vx = 0;
		this.vy = 0;

		this.grid = grid;
		this.num_x = num_x;
		this.width = width;
		this.height = height;
		this.meta_ctx = meta_ctx;
		this.textures = textures;
	}

	first_process() {
		var g = this.grid[Math.round(this.y / SPACING) * this.num_x + Math.round(this.x / SPACING)];

		if (g) g.close[g.length++] = this;

		this.vx = this.x - this.px;
		this.vy = this.y - this.py;

		this.vx += GRAVITY_X;
		this.vy += GRAVITY_Y;
		this.px = this.x;
		this.py = this.y;
		this.x += this.vx;
		this.y += this.vy;
	}

	second_process() {
		var force = 0,
			force_b = 0,
			cell_x = Math.round(this.x / SPACING),
			cell_y = Math.round(this.y / SPACING),
			close = [];

		for (var x_off = -1; x_off < 2; x_off++) {
			for (var y_off = -1; y_off < 2; y_off++) {
				var cell = this.grid[(cell_y + y_off) * this.num_x + (cell_x + x_off)];
				if (cell && cell.length) {
					for (var a = 0, l = cell.length; a < l; a++) {
						var particle = cell.close[a];
						if (particle != this) {
							var dfx = particle.x - this.x;
							var dfy = particle.y - this.y;
							var distance = Math.sqrt(dfx * dfx + dfy * dfy);
							if (distance < SPACING) {
								var m = 1 - distance / SPACING;
								force += Math.pow(m, 2);
								force_b += Math.pow(m, 3) / 2;
								particle.m = m;
								particle.dfx = (dfx / distance) * m;
								particle.dfy = (dfy / distance) * m;
								close.push(particle);
							}
						}
					}
				}
			}
		}

		force = (force - 3) * 0.5;

		for (var i = 0; i < close.length; i++) {
			var neighbor = close[i];

			var press = force + force_b * neighbor.m;
			if (this.type != neighbor.type) press *= 0.35;

			var dx = neighbor.dfx * press * 0.5;
			var dy = neighbor.dfy * press * 0.5;

			neighbor.x += dx;
			neighbor.y += dy;
			this.x -= dx;
			this.y -= dy;
		}

		if (this.x < limit) this.x = limit;
		else if (this.x > this.width - limit) this.x = this.width - limit;

		if (this.y < limit) this.y = limit;
		else if (this.y > this.height - limit) this.y = this.height - limit;

		this.draw();
	}

	draw() {
		var size = RADIUS * 2;
		this.meta_ctx.drawImage(this.textures[this.type], this.x - RADIUS, this.y - RADIUS, size, size);
	}
}
