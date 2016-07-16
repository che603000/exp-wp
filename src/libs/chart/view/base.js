/**
 * Created by Администратор on 16.07.2016.
 */

export default class Base {

    get defaultStyle() {
        return {
            strokeStyle: '#000',
            fillStyle: '#000',
            lineWidth: 1,
        }
    }

    get selectedStyle() {
        return {
            strokeStyle: '#000',
            fillStyle: '#000',
            lineWidth: 8,
        }
    }

    get style() {
        return {...this.defaultStyle, ...this._options.style};
    }

    constructor(attr, options = {}) {
        this._options = options;
    }

    draw(chart) {

    }

    setStyle(ctx, options) {
        for (let props in options) {
            ctx[props] = options[props];
        }
    }

}