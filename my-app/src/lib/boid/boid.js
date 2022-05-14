import Victor from 'victor';
import alignment from './alignment';
import cohesion from './cohesion';
import separation from './separation';

/**
 * @param {number} id
 */
export default function Boid(id) {
	this.i = id
	this.position = new Victor(0, 0);
	this.velocity = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);

	this.viewDistance = 100
	this.desiredSpeed = 20


	/**
	 * @param {Victor} mousePos
	 * @param {Boid[]} boids
	 */
	this.tick = (mousePos, boids) => {
		this.decision(mousePos, boids);
		this.update()
	};
}

function getFriction() {
	//TODO !
	return 0.005;
}

function getMaxForce() {
	//TODO !
	return 5;
}

function getWeights() {
	//TODO !
	// Recommended values: 4/8, 3/8, 1/8
	return {
		separation: 4 / 8,
		alignment: 6 / 8,
		cohesion: 1 / 8
	};
}

/**
 * @param {Victor} desired
 */
Boid.prototype.steer = function (desired) {
	return desired.subtract(this.velocity);
};

/**
 * The boid must react to the environment
 * @param {Victor} mousePos
 * @param {Boid[]} _boids
 **/
Boid.prototype.decision = function (mousePos, _boids) {
	// Select only the neighbouring boids
	var boids = _boids.filter((boid) => {
		return withinRangeOf(this) && boid.i != this.i
	});
	// Perform flocking
	this.flock(mousePos, boids);
};

/**
 * Calculate the acceleration of the boid
 * using the 3 rules of flocking
 * @param {Boid[]} boids
 **/
Boid.prototype.flock = function (mousePos, boids) {
	// Calculate flocking forces
	var sep = separation(this, boids);
	var ali = alignment(this, boids);
	var coh = cohesion(this, boids);

	// Apply weights to forces
	sep.multiplyScalar(getWeights().separation);
	ali.multiplyScalar(getWeights().alignment);
	coh.multiplyScalar(getWeights().cohesion);

	var towardsMouse  = this.steer(mousePos.clone().subtract(this.position).divideScalar(200));

	// Calculate acceleration
	this.acceleration.add(sep).add(ali).add(coh).add(towardsMouse);
	limitForce(this.acceleration);
};

/**
 * A filter for boids that aren't close enough.
 * @param {Boid} boid
 **/
function withinRangeOf(boid) {
	return function (/** @type {Boid} */ other) {
		return boid.position.distance(other.position) <= boid.viewDistance;
	};
}

// This is how the boid is updated each step
Boid.prototype.update = function () {
	// Update velocity
	this.velocity.add(this.acceleration);

	// Apply friction
	this.velocity.multiplyScalar(1 - getFriction());

	// Apply velocity to position
	this.position.add(this.velocity);

	// Reset acceleration
	this.acceleration.zero();
};

/**
 * @param {Victor} vector
 */
function limitForce(vector) {
	var maxForce = getMaxForce();
	// Limit the vector to a certain length.
	if (vector.length() > maxForce) {
		vector.normalize().multiplyScalar(maxForce);
	}
	return vector;
}
