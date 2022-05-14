// @ts-ignore
// eslint-disable-next-line no-unused-vars
import Boid from '$lib/boid/boid';
import Victor from 'victor';

/**
 * @param {Boid} boid
 * @param {Boid[]} boids
 */
export default function separation(boid, boids) {
	// Choose a distance at which boids start avoiding each other
	var desiredSeparation = boid.viewDistance / 2;

	var desired = new Victor(0, 0);

	// For every flockmate, check if it's too close
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		var dist = boid.position.distance(other.position);
        if (dist == 0) {
            let newPos = boid.position.clone()
            newPos.addScalarX((Math.random() - 0.5) * 100)
            newPos.addScalarY((Math.random() - 0.5) * 25)
            console.log("inside!!!", newPos.subtract(boid.position));

            desired.add(newPos)
        } else if (dist < desiredSeparation && dist > 0) {
			// Calculate vector pointing away from the flockmate, weighted by distance
			var diff = boid.position.clone().subtract(other.position).normalize().divideScalar(dist);
			desired.add(diff);
		}
	}

	
	// If the boid had flockmates to separate from
	if (desired.length() > 0) {
		// We set the average vector to the length of our desired speed
		desired.normalize().multiplyScalar(boid.desiredSpeed);

		// We then calculate the steering force needed to get to that desired velocity
		return boid.steer(desired);
	}

	return desired;
};