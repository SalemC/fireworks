import { getRandomInt, invertColor, rgbToHex, splitRandomColor } from '../../../helpers';

import Particle from '../';

class Child extends Particle {
    /**
     * Child Particle class.
     *
     * @param {Number} x
     * @param {Number} y
     * @param {React.RefObject<any>.current} canvas
     * @param {Number} color
     * @param {Number} velocity
     * @param {Number} hasInverted
     *
     * @return {Child}
     */
    constructor (x, y, canvas, color, velocity, hasInverted) {
        super(x, y, canvas, color, velocity);

        this.velocity = {
            x: Math.random() * getRandomInt(-30, 30),
            y: Math.random() * getRandomInt(-30, 30),
        };

        this.lifespan = getRandomInt(80, 120) / 100;
        this.size = getRandomInt(10, 20) / 10;
        this.type = getRandomInt(0, 3);

        // 1 in 5 chance to have the opposite colored particle
        this.color = hasInverted && getRandomInt(0, 5) === 0
            ? invertColor(
                rgbToHex(
                    splitRandomColor(color)[0],
                    splitRandomColor(color)[1],
                    splitRandomColor(color)[2],
                ),
            ) : color;
    }

    /**
     * Is our particle valid?
     *
     * @return {Boolean}
     */
    valid = () => this.lifespan <= 0

    /**
     * Update our particle.
     *
     * @return {void}
     */
    update = () => {
        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        this.lifespan -= 0.008;

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x *= 0;
        this.acceleration.y *= 0;
    }

    /**
     * Draw a circle.
     *
     * @return {void}
     */
    drawCircle = (context) => context.arc(
        this.position.x,
        this.position.y,
        this.size,
        0,
        2 * Math.PI,
    );

    /**
     * Draw a triangle.
     *
     * @return {void}
     */
    drawTriangle = (context) => {
        const { size, position } = this;
        const { x, y } = position;

        context.moveTo(x + size, y);
        context.lineTo(x, y - size);
        context.lineTo(x - size, y);
        context.lineTo(x + size, y);
    }

    /**
     * Draw a square.
     *
     * @return {void}
     */
    drawSquare = (context) => {
        const { size, position } = this;
        const { x, y } = position;

        context.moveTo(x, y);
        context.lineTo(x + size, y);
        context.lineTo(x + size, y + size);
        context.lineTo(x, y + size);
        context.lineTo(x, y);
    }

    /**
     * Draw a shape based on our particle type.
     *
     * @return {void}
     */
    drawRandomShape = (context) => {
        switch (this.type) {
            case (0):
                return this.drawCircle(context);
            case (1):
                return this.drawTriangle(context);
            case (2):
                return this.drawSquare(context);
            default:
                return null;
        }
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

        // Fade out
        context.globalAlpha = this.lifespan > 0 ? this.lifespan : 0;

        // Draw a random shape
        this.drawRandomShape(context);

        // Styles
        context.strokeStyle = this.color;

        // Draw
        context.stroke();

        context.closePath();
    }
}

export default Child;
