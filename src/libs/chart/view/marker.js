/**
 * Created by alex on 19.07.2016.
 */

import Base from "./base";

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

    get ctx() {
        if (!this._ctx) {
            this._ctx = this._canvas.getContext('2d');
        }
        return this._ctx;
    }

    get width() {
        return this._chart.width;
    }

    get height() {
        return this._chart.height;
    }

    constructor(container, chart, options = {isClearOut: true}) {
        super(null, options);
        this._chart = chart;
        this.$container = $(container);
        const {width, height, padding} =  chart;

        this._canvas = $(`<canvas  class="chart"/>`)
            .attr({width, height})
            .css({top: padding[0], left: padding[1]}).get(0);
        $(container).append(this._canvas);

        $(this._canvas).on('mousemove', this.onMove.bind(this))
        this._options.isClearOut && $(this._canvas).on('mouseout', this.clear.bind(this))
    }

    pointToData(point) {
        const {x, y} = point;
        return {
            x: this._chart.axisX.pointToData(x),
            y: this._chart.axisY.pointToData(y)
        };

    }

    onMove(e) {
        this.clear();
        const point = {
            x: e.offsetX,
            y: e.offsetY
        }
        this.draw(point);
    }

    clear() {
        this.ctx.clearRect(0, 0, this._chart.width, this._chart.height);
    }

    draw(point) {

    }
}

