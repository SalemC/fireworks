import { getRandomInt, invertColor, rgbToHex, splitRandomColor } from '../../helpers';

class Particle {
    constructor (x, y, canvas, color, velocity) {
        this.position = {
            x,
            y,
        };

        this.velocity = velocity;

        this.acceleration = {
            x: 0,
            y: 0,
        };

        this.canvas = canvas;
        this.color = color;
    }

    update = () => {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x *= 0;
        this.acceleration.y *= 0;
    }

    applyForce = (force) => {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

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

class ChildParticle extends Particle {
    constructor (x, y, canvas, color, velocity, hasInverted) {
        super(x, y, canvas, color, velocity);

        this.velocity = {
            x: Math.random() * getRandomInt(-30, 30),
            y: Math.random() * getRandomInt(-30, 30),
        };

        this.lifespan = getRandomInt(80, 100) / 100;
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
            )
            : color;
    }

    valid = () => this.lifespan <= 0

    update = () => {
        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        this.lifespan -= 0.011;

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x *= 0;
        this.acceleration.y *= 0;
    }

    drawCircle = (context) => {
        context.arc(
            this.position.x,
            this.position.y,
            this.size,
            0,
            2 * Math.PI,
        );
    }

    drawTriangle = (context) => {
        const { size, position } = this;
        const { x, y } = position;

        context.moveTo(x + size, y);
        context.lineTo(x, y - size);
        context.lineTo(x - size, y);
        context.lineTo(x + size, y);
    }

    drawSquare = (context) => {
        const { size, position } = this;
        const { x, y } = position;

        context.moveTo(x, y);
        context.lineTo(x + size, y);
        context.lineTo(x + size, y + size);
        context.lineTo(x, y + size);
        context.lineTo(x, y);
    }

    getDrawMethod = (context) => {
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

    draw = () => {
        if (!this.canvas) { return; }

        const context = this.canvas.getContext('2d');

        context.beginPath();

        // Fade out
        context.globalAlpha = this.lifespan > 0 ? this.lifespan : 0;

        // Draw our shape
        this.getDrawMethod(context);

        // Styles
        context.strokeStyle = this.color;

        // Draw
        context.stroke();

        context.closePath();
    }
}

export { ChildParticle, Particle };
