import Boid from '$lib/boid/boid';
import Victor from 'victor';

/**
 * @param {Boid} boid
 * @param {Boid[]} boids
 */
export default function cohesion(boid, boids) {
	var average = new Victor(0, 0);

	// Get the average position of all nearby boids.
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		average.add(other.position);
	}

	if (boids.length > 0) {
		// The average is the the sum of vectors divided by the number of flockmates
		var destination = average.divideScalar(boids.length);

		// We calculate the vector from this boid to the destination point
		var desired = destination.subtract(boid.position);

		// We want our desired velocity to be of the length of our desired speed, or zero.
		if (desired.length() > 0) {
			desired.normalize().multiplyScalar(6);
		}

		// We then calculate the steering force needed to get to that desired velocity
		return boid.steer(desired);
	}
	return average;
}
