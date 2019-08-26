import React, { Component, createRef } from 'react';

import { getRandomInt, calculateAge, getVisibility, generateCircle } from './helpers';
import Firework from './components/Firework';
import Details from './components/Details';

class App extends Component {
    /**
     * Our default state.
     */
    state = {
        dimensions: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        fireworks: [],
        visibility: getVisibility(),
        age: calculateAge(),
        secret: '',
    }

    /**
     * The timeout for creating a firework.
     */
    fireworkTimeout = null;

    /**
     * The interval between state cleanups.
     */
    cleanInterval = null;

    /**
     * Intervals used for initializing the display.
     */
    initializingIntervals = {};

    /**
     * Our canvas.
     */
    canvas = createRef();

    /**
     * Handle the mounting of our component.
     *
     * @return {void}
     */
    componentDidMount () {
        this.setupListeners();
        this.setupTimings();
    }

    /**
     * Handle the unmounting of our component.
     *
     * @return {void}
     */
    componentWillUnmount () {
        this.clearListeners();
        this.clearTimings();
    }

    /**
     * Setup all our intervals/timeouts.
     *
     * @return {void}
     */
    setupTimings = () => {
        this.cleanInterval = setInterval(this.cleanFireworks, 7.5);

        this.initialize();
    }

    /**
     * Clear all our timeouts/intervals.
     *
     * @return {void}
     */
    clearTimings = () => {
        clearInterval(this.cleanInterval);
        clearInterval(this.fireworkTimeout);
    }

    /**
     * Setup all event listeners.
     *
     * @return {void}
     */
    setupListeners = () => {
        const { visibility: { visibilityChange } } = this.state;

        window.addEventListener('resize', this.handleResize);
        document.addEventListener(visibilityChange, this.handleVisibilityChange);
        document.addEventListener('keypress', this.handleKeyPress);
    }

    /**
     * Clear all event listeners.
     *
     * @return {void}
     */
    clearListeners = () => {
        const { visibility: { visibilityChange } } = this.state;

        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener(visibilityChange, this.handleVisibilityChange);
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    /**
     * Handle a keyboard event.
     */
    handleKeyPress = ({ key }) => {
        const { secret } = this.state;

        if (process.env.REACT_APP_secret !== secret) {
            if (process.env.REACT_APP_secret.charAt(secret.length) === key) {
                this.setState({ secret: `${secret}${key}`});
            } else {
                this.setState({ secret: '' });
            }
        }
    }

    /**
     * Handle the window resize event.
     *
     * @return {void}
     */
    handleResize = () => this.setState({
        dimensions: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
    });

    /**
     * Handle our visibility change.
     *
     * @return {void}
     */
    handleVisibilityChange = () => this.setState(({ visibility }) => ({
        visibility: {
            ...visibility,
            visible: !document[visibility.hidden]
        },
    }));

    /**
     * Initialize the firework display!
     */
    initialize = () => {
        const { dimensions: { height, width } } = this.state;

        this.startDisplay();

        return;

        const acceleration = { x: 0, y: 0.05 };

        const createFirework = ({ x, y }) => new Firework(
            this.canvas.current,
            acceleration,
            { x: 0, y: -Math.sqrt(0 + ((2 * acceleration.y) * y))},
            false,
            x,
        );

        const fireworks = {
            s: [{
                part: generateCircle({ x: width * 0.3, y: height * 0.6 }, 15, 75),
                modifier: (part) => {
                    part.splice(-3, 4);

                    return part;
                }
            }, {
                part: generateCircle({ x: width * 0.3, y: height * 0.435 }, 15, 75),
                modifier: (part) => {
                    part.splice(4, 4);

                    return part.slice(0, part.length / 2.5).reverse();
                },
            }, {
                part: generateCircle({ x: width * 0.3, y: height * 0.435 }, 15, 75),
                modifier: (part) => {
                    part.splice(4, 4);

                    return part.slice(part.length / 2.5, part.length).reverse();
                },
            }],
            c: [{
                part: generateCircle({ x: width * 0.6, y: height * 0.518 }, 15, 150),
                modifier: (part) => {
                    part.splice(0, 3);
                    part.splice(-2, 3);

                    return part;
                },
            }],
        }

        Object.entries(fireworks).forEach(([shape, parts]) => {
            const subParts = parts.reduce((acc, { part, modifier }) => [...acc, ...modifier(part)], []);

            this.initializingIntervals[shape] = setInterval(() => {
                const firework = createFirework(subParts.splice(0, 1)[0]);

                this.setState(({ fireworks: sFireworks }) => ({
                    fireworks: [...sFireworks, firework],
                }));

                this.cleanFireworks();

                if (subParts.length <= 0) {
                    clearInterval(this.initializingIntervals[shape]);

                    delete this.initializingIntervals[shape];
                }
            }, 1);
        });

        const startInterval = setInterval(() => {
            if (Object.keys(this.initializingIntervals).length <= 0) {
                setTimeout(() => {
                    this.cleanFireworks(true);

                    this.startDisplay();
                }, 4000);

                clearInterval(startInterval);
            }
        }, 1)
    }

    /**
     * Start the firework display!
     *
     * @return {void}
     */
    startDisplay = () => {
        const { dimensions: { height }, visibility: { visible } } = this.state;

        const acceleration = { x: 0, y: 0.1 };

        const velocity = {
            x: -getRandomInt(-1, 1),
            // SUVAT: v^2 = u^2 + 2as
            y: -Math.sqrt(
                0 + ((2 * acceleration.y)
                // Explode anywhere between 80-90% of screen height
                * getRandomInt(height * 0.80, height * 0.90)
                ),
            ),
        };

        // If our screen is visible, create fireworks
        if (visible) {
            this.spawnFirework(velocity, acceleration);
        // If our screen isn't visible, reset our fireworks array
        } else {
            this.cleanFireworks(true);
        }

        clearTimeout(this.fireworkTimeout);
        this.fireworkTimeout = setTimeout(this.startDisplay, getRandomInt(300, 600));
    }

    /**
     * Generate a firework & add it to our display.
     *
     * @param {Number} velocity
     * @param {Number} acceleration
     *
     * @return {void}
     */
    spawnFirework = (velocity, acceleration) => this.setState(({
        visibility: { visible },
        fireworks,
    }) => ({
        fireworks: [
            ...fireworks,
            visible ? new Firework(this.canvas.current, acceleration, velocity) : undefined,
        ],
    }));

    /**
     * Animate our existing fireworks.
     *
     * @return {void}
     */
    animateFireworks = () => {
        const { fireworks, dimensions: { width, height } } = this.state;

        const context = this.canvas.current.getContext('2d');

        // Give a small trail effect to our fireworks
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0, 0, 0, 0.575)';
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';

        // Draw our fireworks
        fireworks.forEach(({ update, draw }) => { update(); draw(); });
    }

    /**
     * Remove all our invalid fireworks.
     *
     * @param {Boolean} reset - Should we reset the display?
     *
     * @return {void}
     */
    cleanFireworks = (reset = false) => this.setState(({ fireworks }) => ({
        fireworks: reset ? [] : fireworks.filter(({ valid }) => !valid()),
        age: calculateAge(),
    }), this.animateFireworks);

    /**
     * Render our class.
     *
     * @return {void}
     */
    render () {
        const { dimensions, age, secret } = this.state;

        return (
            <div className="main-container">
                <canvas ref={this.canvas} {...dimensions} />

                {secret !== process.env.REACT_APP_secret && <Details age={age} />}
            </div>
        )
    }
}

export default App;
