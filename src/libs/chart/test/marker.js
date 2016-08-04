/**
 * Created by alex on 19.07.2016.
 */

const Backbone = require('backbone'),
    _ = require('underscore');

import Base from "../view/marker";

export default class Marker extends Base {
    get defaultStyle() {
        return {
            strokeStyle: 'rgba(0,0,0,0.8)',
            fillStyle: '#333',
            lineWidth: 0,
            lineDashOffset: 0,
            font: "12px serif",
            textAlign: 'center'
        }
    }

    constructor(container, chart, options) {
        super(container, chart, options);
        _.extend(this, Backbone.Events);
    }

    draw(point) {
        this.setStyle(this.ctx, this.style);
        this.ctx.beginPath();
        this.ctx.setLineDash([5]);
        this.ctx.moveTo(0, point.y);
        this.ctx.lineTo(this.width, point.y);
        this.ctx.stroke();
        const p = this._chart.mapper(point),
            data = this.pointToData(p);
        this.drawText(point, data.y | 0)
        this.trigger('move', {point: p, data});
    }

    drawText(point, text) {
        const h = 16, w = 35, pad = 10,
            x = this.width / 2,
            y = point.y - 4;

        this.ctx.clearRect(x, y, w, -h);
        //this.ctx.strokeRect(x, y, w, -h);
        this.ctx.fillText(text, x, y);
    }
}

