import Victor from 'victor';
import Boid from './boid';

/**
 * @param {Boid} boid
 * @param {Boid[]} boids
 */
export default function alignment(boid, boids) {
	var sum = new Victor(0, 0);

	// For every nearby boid, sum their velocity
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		sum.add(other.velocity);
	}

	// If the sum of all flockmate's velocities isn't nul
	if (!sum.isZero()) {
		// We want our desired velocity to be of the length of our desired speed
		var desired = sum.normalize().multiplyScalar(boid.desiredSpeed);

		// We then calculate the steering force needed to get to that desired velocity
		return boid.steer(desired);
	}

	return sum;
}
