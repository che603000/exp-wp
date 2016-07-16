/**
 * Created by alex on 13.07.2016.
 */
"use strict";

import Base from './base'

export default class Draw extends Base {

    get defaultStyle() {
        return {
            strokeStyle: 'rgba(0,0,0,0.5)',
            fillStyle: 'rgba(0,0,0,0.5)',
            lineWidth: 1,
        }
    }

    get selectedStyle() {
        return {
            lineWidth: 5,
        }
    }

    get id() {
        return this.model.id;
    }

    constructor(model, options = {}) {
        super(model, options);
        this.model = model;
    }

    draw(chart) {
    }

    calculation(chart) {

    }

    select(chart) {
        this.draw(chart);
    }

}

