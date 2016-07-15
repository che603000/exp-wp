/**
 * Created by alex on 13.07.2016.
 */
"use strict";


export default class Chart {

    get AxisY() {
        return AxisY;
    }

    get ctx() {
        if (!this._ctx) {
            this._ctx = this.canvas.getContext('2d');
            //this._ctx.globalCompositeOperation = 'source-over';
        }
        return this._ctx;
    }

    get maxDataY() {
        return this._maxDataY > 15000 ? 15000 : this._maxDataY;//this._maxDataY
    }

    get maxDataX() {
        return this._maxDataX
    }

    get width() {
        return this.canvas.width - 60;
    }

    get height() {
        return this.canvas.height - 20

    }

    static create(container, options = {}) {
        const $cnt = $(container),
            $cnv = $('<canvas/>', {width: $cnt.width(), height: $cnt.height(), ... options});
        $cnt.append($cnv);
        return new Chart($cnv.get(0));
    }

    constructor(canvas) {
        this._keys = {};
        this._layers = [];
        this._filter = [];
        this.canvas = $(canvas).get(0);
        this.axixY = new this.AxisY();
    }


    clear() {
        this.ctx.clearRect(0, 0, this.width + 60, this.height + 20);
    }

    filter(layer) {
        return !this._filter.some(l=>l === layer.id)
        //layer.id !== 'red';
    }

    sort(a, b) {
        return a.minY - b.minY
    }

    render(isCalculation = true) {
        isCalculation && this.calculation();
        this.clear();
        this.ctx.save();
        this.ctx.translate(10, 10);

        this._layers
            .filter(this.filter, this)
            .reverse()
            .forEach(layer=> {
                if (this.selected && this.selected === layer)
                    layer.select(this);
                else
                    layer.draw(this)
            });

        this.axixY.draw(this);
        this.ctx.restore();
        return this;

    }

    select(id) {
        this.selected = this._keys[id];
        return this;
    }

    calculation() {
        this._maxDataY = 0
        this._maxDataX = 0;

        this._layers.filter(this.filter, this)
            .forEach(layer=> {
                if (this._maxDataY < layer.maxY)
                    this._maxDataY = layer.maxY
                if (this._maxDataX < layer.dataX)
                    this._maxDataX = layer.dataX
            });
    }

    add(layer) {
        this._keys[layer.id] = layer;
        this._layers.push(layer);
        this._layers = this._layers.sort(this.sort, this);
        return this;
    }

    remove(id) {
        const index = this._layers.indexOf(this._keys[id]);
        delete this._keys[id];
        this._layers.splice(index, 1);
        return this;
    }

    get(id) {
        return this._keys[id];
    }

    isContains(x, y) {
        return this._layers
            .filter(this.filter, this)
            .some(layer=>layer.isContains(x, y));
    }

    getLayers(x, y) {
        return this._layers.filter(layer=>this.filter(layer) && layer.isContains(x, y));
    }

    setFilter(value) {
        this._filter = value;
        return this;
    }

    dataToPointY(value) {
        return (this.height - (value / this.maxDataY * this.height)) + 0.5 | 0;
    }

    pointToDataY(value) {
        return this.maxDataY * value / this.height;
    }

    dataToPointX(value) {
        return (value / this.maxDataX * this.width);
    }
}

export class AxisY {

    get defaultStyle() {
        return {
            strokeStyle: 'rgba(124,124,124,0.5)',
            fillStyle: '#000',
            lineWidth: 0.9,
            font: "12px serif"
        }
    }

    constructor(data, options = {}) {
        this.options = {...this.defaultStyle, ...options};
        this._data = data;
    }

    draw(chart) {
        const {ctx, maxDataY, height, width} = chart,
            delta = this._delta(chart, 2);

        this.setStyle(ctx, this.options);

        for (let dataY = 0; dataY < chart.maxDataY; dataY += delta) {
            const y = chart.dataToPointY(dataY);
            this.drawLine(chart, y)
            this.drawText(chart, y, dataY.toString())
        }
    }

    drawLine(chart, y) {
        const {ctx, width} = chart;
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.moveTo(-5, y);
        ctx.lineTo(width + 7, y);
        ctx.stroke();

    }

    drawText(chart, y, text) {
        const h = 16, w = 35, {width} = chart;
        //chart.ctx.clearRect(width, y - h + 2, w +4, h);
        chart.ctx.fillText(text, width + 10, y + 4);
    }

    setStyle(ctx, options) {
        for (let props in options) {
            ctx[props] = options[props];
        }
    }

    _delta(chart) {
        const {ctx, maxDataY, height, width} = chart,
            d = parseInt(chart.pointToDataY(height / 3)),
            countZero = Math.pow(10, d.toString().length),
            base = (d / countZero + 0.5 | 0);

        return base ? (base * countZero) : countZero / 10;
    }
}