import { getRandomInt, getRandomColor } from '../../helpers';

import ChildParticle from '../Particle/Child';
import Particle from '../Particle';

class Firework {
    /**
     * Firework class.
     *
     * @param {React.RefObject<any>.current} canvas
     * @param {Number} gravity
     * @param {Number} velocity
     *
     * @return {Firework}
     */
    constructor (canvas, gravity, velocity) {
        this.canvas = canvas;

        this.color = getRandomColor();

        this.gravity = gravity;

        this.velocity = velocity;

        // 1 in 3 chance to have inverted particles
        this.hasInverted = getRandomInt(0, 3) === 0;

        this.firework = new Particle(
            getRandomInt(0, canvas.width),
            canvas.height,
            canvas,
            this.color,
            this.velocity,
        );

        this.exploded = false;

        this.particles = [];
    }

    /**
     * Is our firework still valid?
     *
     * @return {Boolean}
     */
    valid = () => this.exploded && this.particles.length <= 0

    /**
     * Update the firework.
     *
     * @return {void}
     */
    update = () => {
        const {
            exploded,
            firework: {
                applyForce,
                update,
                velocity
            },
            explode,
            gravity,
        } = this;

        if (!exploded) {
            applyForce(gravity);
            update();

            // If we've got 0 velocity or above, we've hit our apex;
            // Let's explode the particle
            if (velocity.y >= 0) { explode(); }
        } else {
            // Update each child particle
            this.particles.forEach((particle) => {
                particle.applyForce(gravity);
                particle.update();
            });

            // Remove any invalid particles
            this.particles = this.particles.filter(({ valid }) => !valid());
        }
    }

    /**
     * Make the firework explode.
     *
     * @return {void}
     */
    explode = () => {
        const {
            firework, canvas, particles, color, velocity, hasInverted,
        } = this;

        // Make 100 child particles
        new Array(100).fill(null).forEach(() => particles.push(
            new ChildParticle(
                firework.position.x,
                firework.position.y,
                canvas,
                color,
                velocity,
                hasInverted,
            ),
        ));

        this.exploded = true;
    }

    /**
     * Draw the firework.
     *
     * @return {void}
     */
    draw = () => {
        const { draw } = this.firework;

        // Once we've exploded, we don't want to draw the parent particle
        if (!this.exploded) { draw(); }

        // Draw each child particle
        this.particles.forEach(particle => particle.draw());
    }
}

export default Firework;
