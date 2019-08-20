import React, { Component, createRef } from 'react';
import moment from 'moment';

import Firework from './components/Firework';
import { getRandomInt } from './helpers';

class App extends Component {
    state = {
        dimensions: {
            width: 0,
            height: 0,
        },
        fireworks: [],
        visibility: {
            visible: true,
            hidden: '',
            visibilityChange: '',
        },
        age: 0,
    }

    fireworkTimeout = null;

    cleanInterval = null;

    canvas = createRef();

    componentDidMount () {
        this.handleResize();

        this.setupListeners();
        this.setupIntervals();
    }

    componentWillUnmount () {
        this.removeListeners();
        this.removeIntervals();
    }

    /**
     * Setup all our intervals
     */
    setupIntervals = () => {
        // Clean our state and animate our canvas every 7.5ms
        this.cleanInterval = setInterval(() => {
            this.cleanFireworks();
        }, 7.5);

        // Every 300-600ms, create another firework
        const fireworkLoop = () => {
            const { dimensions: { height }, visibility: { visible }} = this.state;

            const acceleration = {
                x: 0,
                y: 0.1,
            };

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
                this.createFirework(velocity, acceleration);
            // If our screen isn't visible, reset our fireworks array
            } else {
                this.cleanFireworks(true);
            }

            clearTimeout(this.fireworkTimeout);
            this.fireworkTimeout = setTimeout(fireworkLoop, getRandomInt(300, 600));
        };

        // Setup our first timeout
        this.fireworkTimeout = setTimeout(fireworkLoop, getRandomInt(300, 600));
    }

    /**
     * Remove all our intervals
     */
    removeIntervals = () => {
        clearInterval(this.cleanInterval);
        clearInterval(this.fireworkTimeout);
    }

    /**
     * Setup all our event listeners
     */
    setupListeners = () => {
        this.setupVisibilityListener();

        window.addEventListener('resize', this.handleResize);
    }

    /**
     * Remove all our event listeners
     */
    removeListeners = () => {
        const { visibility: { visibilityChange } } = this.state;

        document.removeEventListener(visibilityChange, this.handleVisibilityChange);
        window.removeEventListener('resize', this.handleResize);
    }

    /**
     * Handle the window resize event
     */
    handleResize = () => this.setState((current) => {
        const next = { ...current };

        next.dimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        return next;
    })

    /**
     * Setup a visibility listener to check if our window is foregrounded
     */
    setupVisibilityListener = () => this.setState((current) => {
        const next = { ...current };

        if (typeof document.hidden !== 'undefined') {
            next.visibility.hidden = 'hidden';
            next.visibility.visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            next.visibility.hidden = 'msHidden';
            next.visibility.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            next.visibility.hidden = 'webkitHidden';
            next.visibility.visibilityChange = 'webkitvisibilitychange';
        }

        return next;
    }, () => {
        const { visibility: { visibilityChange } } = this.state;

        document.addEventListener(visibilityChange, this.handleVisibilityChange);
    })

    /**
     * Handle our visibility change
     */
    handleVisibilityChange = () => this.setState((current) => {
        const next = { ...current };

        next.visibility.visible = !document[next.visibility.hidden];

        return next;
    })

    /**
     * Create a single firework
     */
    createFirework = (velocity, acceleration) => this.setState((current) => {
        const next = { ...current };

        // If our screen is in the foreground, add more fireworks
        if (next.visibility.visible) {
            next.fireworks.push(new Firework(this.canvas.current, acceleration, velocity));
        }

        return next;
    })

    /**
     * Animate our existing fireworks
     */
    animateFireworks = () => {
        const { fireworks, dimensions: { width, height } } = this.state;

        // Grab our context from our canvas
        const context = this.canvas.current.getContext('2d');

        // Give a small trail effect to our fireworks
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0, 0, 0, 0.575)';
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';

        // Draw our fireworks
        fireworks.forEach((firework) => {
            firework.update();
            firework.draw();
        });
    }

    /**
     * Remove all our invalid fireworks
     */
    cleanFireworks = (reset = false) => this.setState((current) => {
        const next = { ...current };

        // If we're resetting, empty our fireworks array
        next.fireworks = reset ? [] : next.fireworks.filter(firework => !firework.valid());

        // Calculate my age
        next.age = moment().diff(moment('2000-03-23'), 'years');

        return next;
    }, this.animateFireworks)

    getAgeText = () => {
        const { age } = this.state;

        const type = age.toString().startsWith('8') || age === 18 ? 'an' : 'a';

        return `I'm ${type} ${age} year-old, web-based software developer.`;
    }

    render () {
        const { dimensions } = this.state;

        return (
            <div className="main-container">
                <canvas ref={this.canvas} {...dimensions} />

                <div className="details-container">
                    <h1 className="white header">Salem Cresswell</h1>

                    <p className="white secondary">{this.getAgeText()}</p>
                    <p className="white secondary">On a day-to-day basis, I'll mainly program in Javascript, HTML & PHP.</p>
                </div>
            </div>
        )
    }
}

export default App;
