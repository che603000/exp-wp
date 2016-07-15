/**
 * Created by alex on 13.07.2016.
 */
"use strict";


export default class Rect {

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
        return this._data.id;
    }

    get maxY() {
        return this.alts.max;
    }

    get minY() {
        return this.alts.min;
    }

    get dataX() {
        return Math.log(parseInt(this._data.area));
    }

    get alts() {
        return this._data.alts;
    }

    get rect() {
        return {
            x: this.x1,
            y: this.y1,
            w: this.x2 - this.x1,
            h: this.y2 - this.y1
        }
    }

    constructor(data, options = {}) {
        this.options = {...this.defaultStyle, ...options};
        this._data = data;
    }

    draw(chart) {
        this.calculation(chart)
        this.setStyle(chart.ctx, this.options);
        chart.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        chart.ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }

    calculation(chart) {
        const w = chart.dataToPointX(this.dataX)
        this.x1 = chart.width / 2 - w / 2;
        this.x2 = chart.width / 2 + w / 2;

        this.y1 = chart.dataToPointY(this.minY);
        this.y2 = chart.dataToPointY(this.maxY);
    }

    setStyle(ctx, options) {
        for (let props in options) {
            ctx[props] = options[props];
        }
    }

    isContains(x, y) {
        return this.x1 < x && this.x2 > x && this.y1 > y && this.y2 < y;
    }

    select(chart) {
        this.setStyle(chart.ctx, {...this.options, ...this.selectedStyle});
        chart.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }

}

