import moment from 'moment';

export const getRandomInt = (min = 0, max = 1) => {
    let minimum = min;
    let maximum = max;

    minimum = Math.ceil(min);
    maximum = Math.floor(max);

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;

export const splitRandomColor = color => color.replace('rgb(', '').replace(')', '').split(',');

export const componentToHex = (c) => {
    const hex = c.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

export const padZero = (string, len) => {
    const length = len || 2;

    const zeros = new Array(length).join('0');

    return (zeros + string).slice(-length);
};

export const invertColor = (hex) => {
    let toReturn = hex;

    if (toReturn.indexOf('#') === 0) {
        toReturn = toReturn.slice(1);
    }

    if (toReturn.length === 3) {
        toReturn = toReturn[0]
        + toReturn[0]
        + toReturn[1]
        + toReturn[1]
        + toReturn[2]
        + toReturn[2];
    }

    let r = parseInt(toReturn.slice(0, 2), 16);
    let g = parseInt(toReturn.slice(2, 4), 16);
    let b = parseInt(toReturn.slice(4, 6), 16);

    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
};

export const calculateAge = () => moment().diff(moment('2000-03-23'), 'years');

export const getVisibility = () => {
    if (typeof document.hidden !== 'undefined') {
        return {
            visible: true,
            hidden: 'hidden',
            visibilityChange: 'visibilitychange',
        }
    } else if (typeof document.msHidden !== 'undefined') {
        return {
            visible: true,
            hidden: 'msHidden',
            visibilityChange: 'msvisibilitychange',
        }
    } else if (typeof document.webkitHidden !== 'undefined') {
        return {
            visible: true,
            hidden: 'webkitHidden',
            visibilityChange: 'webkitvisibilitychange',
        }
    }

    return {
        visible: true,
        hidden: '',
        visibilityChange: '',
    }
}
