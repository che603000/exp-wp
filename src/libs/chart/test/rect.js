/**
 * Created by alex on 13.07.2016.
 */
"use strict";

import Draw from '../view/draw'

export default class Rect extends Draw {

    get defaultStyle() {
        return {
            strokeStyle: 'rgba(0,0,0,0.5)',
            fillStyle: 'rgba(0,0,0,0.5)',
            lineWidth: 4,
        }
    }

    get selectedStyle() {
        return {
            lineWidth: 7,
        }
    }

    get maxY() {
        return this.alts.max;
    }

    get minY() {
        return this.alts.min;
    }

    get dataX() {
        return this.model.maxX;
    }

    get alts() {
        return this.model._data.alts;
    }

    draw(chart, isSelected) {
        const points = this._points = this.calculation(chart);
        if (isSelected)
            this.setStyle(chart.ctx, {...this.style, ...this.selectedStyle});
        else
            this.setStyle(chart.ctx, this.style);

        const p1 = chart.mapper(points.p1),
            p2 = chart.mapper(points.p2);

        chart.ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        //chart.ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    }

    calculation(chart) {
        const {axisY, axisX}  = chart;
        const w = axisX.dataToPoint(this.dataX);
        return {
            p1: {
                x: chart.width / 2 - w / 2,
                y: axisY.dataToPoint(this.minY)

            },
            p2: {
                x: chart.width / 2 + w / 2,
                y: axisY.dataToPoint(this.maxY)
            }


        }
    }

    isContains(x, y) {
        const points = this._points;
        return points.p1.x < x && points.p2.x > x && points.p1.y > y && points.p2.y < y;
    }


}

