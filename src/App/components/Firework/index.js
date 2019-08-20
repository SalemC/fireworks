import { getRandomInt, getRandomColor } from '../../helpers';
import { Particle, ChildParticle } from '../Particle';

class Firework {
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

    valid = () => this.exploded && this.particles.length <= 0

    update = () => {
        const {
            exploded, firework, explode, gravity,
        } = this;

        const { applyForce, update, velocity } = firework;

        if (!exploded) {
            applyForce(gravity);
            update();

            // If we've got 0 velocity or above, we've hit our apex.
            // Let's explode the particle
            if (velocity.y >= 0) {
                explode();
            }
        } else {
            // Update each child particle
            this.particles.forEach((particle) => {
                particle.applyForce(gravity);
                particle.update();
            });

            // Remove any invalid particles
            this.particles = this.particles.filter(particle => !particle.valid());
        }
    }

    explode = () => {
        const {
            firework, canvas, particles, color, velocity, hasInverted,
        } = this;

        // Make 100 child particles
        Array(...Array(100)).forEach(() => {
            particles.push(
                new ChildParticle(
                    firework.position.x,
                    firework.position.y,
                    canvas,
                    color,
                    velocity,
                    hasInverted,
                ),
            );
        });

        this.exploded = true;
    }

    draw = () => {
        const { draw } = this.firework;

        // Once we've exploded, we don't want to draw the parent particle
        if (!this.exploded) {
            draw();
        }

        // Draw each child particle
        this.particles.forEach(particle => particle.draw());
    }
}

export default Firework;
