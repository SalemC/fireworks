class Particle {
    /**
     * Particle class.
     *
     * @param {Number} x
     * @param {Number} y
     * @param {React.RefObject<any>.current} canvas
     * @param {Number} color
     * @param {Number} velocity
     *
     * @return {Particle}
     */
    constructor (x, y, canvas, color, velocity) {
        this.position = { x, y };

        this.velocity = velocity;

        this.acceleration = { x: 0, y: 0 };

        this.canvas = canvas;
        this.color = color;
    }

    /**
     * Update our particle
     *
     * @return {void}
     */
    update = () => {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x *= 0;
        this.acceleration.y *= 0;
    }

    /**
     * Apply a force to our particle.
     *
     * @return {void}
     */
    applyForce = (force) => {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    /**
     * Draw our particle.
     *
     * @return {void}
     */
    draw = () => {
        if (!this.canvas) { return; }

        const context = this.canvas.getContext('2d');

        context.beginPath();

        context.arc(this.position.x, this.position.y, 2.5, 0, 2 * Math.PI);

        // Styles
        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        // Draw
        context.fill();
        context.stroke();

        context.closePath();
    }
}

export default Particle;
