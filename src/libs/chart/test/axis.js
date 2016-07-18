/**
 * Created by alex on 13.07.2016.
 */
"use strict";

import Axis from '../view/axis'

export class AxisX extends Axis {

    get length() {
        return this._chart.width;
    }

    get max() {
        return this.collection.maxX;
    }

    get min() {
        return this.collection.minX;
    }

    constructor(chart, options) {
        super(chart, options);
        this._chart = chart;
        this.collection = chart.collection;
    }

    draw(chart) {
        // const {ctx, maxDataY, height, width} = chart,
        //     delta = this._delta(chart, 2);
        //
        // this.setStyle(ctx, this.options);
        //
        // for (let dataY = 0; dataY < chart.maxDataY; dataY += delta) {
        //     const y = chart.dataToPointY(dataY);
        //     this.drawLine(chart, y)
        //     this.drawText(chart, y, dataY.toString())
        // }
    }

}

export class AxisY extends Axis {

    get length() {
        return this._chart.height;
    }

    get max() {
        return this.collection.maxY;
    }

    get min() {
        return this.collection.minY;
    }

    constructor(chart, options) {
        super(chart, options);
        this._chart = chart;
        this.collection = chart.collection;
    }

    draw(chart) {
        // const {ctx, maxDataY, height, width} = chart,
        const delta = this._delta(chart, 3);
        //
        this.setStyle(chart.ctx, this.style);
        //
        for (let dataY = 0; dataY < chart.collection.maxY; dataY += delta) {
            const y = this.dataToPoint(dataY);
            this.drawLine(chart, y)
            this.drawText(chart, y, dataY.toString())
        }
    }

    drawLine(chart, y) {
        const {ctx, width} = chart,
            point = chart.mapper({x: 0, y: y}),
            pad = 10

        ctx.beginPath();
        //ctx.setLineDash([5]);
        ctx.moveTo(-pad, point.y);
        ctx.lineTo(width + pad, point.y);
        ctx.stroke();

    }

    drawText(chart, y, text) {
        const h = 16, w = 35, {width} = chart,
            point = chart.mapper({x: 0, y: y}),
            pad = 10
        //view.ctx.clearRect(width, y - h + 2, w +4, h);
        chart.ctx.fillText(text, width + 10, point.y + 4);
    }

    _delta(chart, count) {
        const maxY = chart.collection.maxY,
            dev = Math.pow(10, maxY.toString().length - 2),
            delta = parseInt(maxY / dev / count);
        return delta * dev;
    }


}


//
// export class Axis extends Base {
//
//     get defaultStyle() {
//         return {
//             strokeStyle: 'rgba(124,124,124,0.5)',
//             fillStyle: '#000',
//             lineWidth: 0.9,
//             font: "12px serif"
//         }
//     }
//
//     get length() {
//         return this._options.length;
//     }
//
//     get max() {
//         return this._options.max;
//     }
//
//     get min() {
//         return this._options.min || 0;
//     }
//
//
//     dataToPoint(data) {
//         return data / this.max * this.length;
//     }
//
//     pointToData(point) {
//         return this.max * point / this.length;
//     }
//
//     draw(chart) {
//         const {ctx, maxDataY, height, width} = chart,
//             delta = this._delta(chart, 2);
//
//         this.setStyle(ctx, this.options);
//
//         for (let dataY = 0; dataY < chart.maxDataY; dataY += delta) {
//             const y = chart.dataToPointY(dataY);
//             this.drawLine(chart, y)
//             this.drawText(chart, y, dataY.toString())
//         }
//     }
//
//     drawLine(chart, y) {
//         const {ctx, width} = chart;
//         ctx.beginPath();
//         ctx.setLineDash([5]);
//         ctx.moveTo(-5, y);
//         ctx.lineTo(width + 7, y);
//         ctx.stroke();
//
//     }
//
//     drawText(chart, y, text) {
//         const h = 16, w = 35, {width} = chart;
//         //view.ctx.clearRect(width, y - h + 2, w +4, h);
//         chart.ctx.fillText(text, width + 10, y + 4);
//     }
//
//     _delta(chart) {
//         const {ctx, maxDataY, height, width} = chart,
//             d = parseInt(chart.pointToDataY(height / 3)),
//             countZero = Math.pow(10, d.toString().length),
//             base = (d / countZero + 0.5 | 0);
//
//         return base ? (base * countZero) : countZero / 10;
//     }
// }