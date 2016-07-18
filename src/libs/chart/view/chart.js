/**
 * Created by alex on 13.07.2016.
 */
"use strict";


import Collection from "../data/collection";

export default class Chart {

    get ctx() {
        if (!this._ctx) {
            this._ctx = this._canvas.getContext('2d');
            //this._ctx.globalCompositeOperation = 'source-over';
        }
        return this._ctx;
    }

    get padding() {
        return this._options.padding || [0, 0, 0, 0];
    }

    get width() {
        return this._canvas.width - (this.padding[0] + this.padding[2]);
    }

    get height() {
        return this._canvas.height - (this.padding[1] + this.padding[3]);

    }

    get zero() {
        return this._zero || {x: 0, y: 0};
    }

    static create(container, options = {}) {
        const $cnt = $(container),
            $cnv = $('<canvas/>', {width: $cnt.width(), height: $cnt.height(), ... options});
        $cnt.append($cnv);
        return new Chart($cnv.get(0));
    }

    constructor(canvas, options = {}) {
        this._options = options;
        this._layers = {};
        this._zero = options.zero;
        this.collection = new Collection([], {});
        this._filter = [];
        this._canvas = $(canvas).get(0);
        this.axisY = new options.axisY(this);
        this.axisX = new options.axisX(this);
    }

    mapper(point) {
        return {x: point.x, y: this.height - point.y}
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width * 2, this.height * 2);
    }

    clip(margin = [0, 0, 0, 0]) {
        const {ctx, height, width} = this,
            x = margin[0],
            y = margin[1],
            w = width + margin[2],
            h = height + margin[3];


        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.moveTo(x, y);
        ctx.lineTo(w, y);
        ctx.lineTo(w, h);
        ctx.lineTo(x, h);
        ctx.stroke();
        this.ctx.clip();
    }

    add(layer) {
        this._layers[layer.id] = layer;
        this.collection.add(layer.model);
        return this;
    }

    remove(id) {
        delete this._layers[id];
        this.collection.remove(id);
        return this;
    }

    filter(model) {
        return !this._filter.some(id=>id === model.id)
    }

    setFilter(value) {
        this._filter = value;
        return this;
    }

    isContains(x, y) {
        return this._layers
            .filter(this.filter, this)
            .some(layer=>layer.isContains(x, y));
    }

    get(id) {
        return this._keys[id];
    }

    getLayers(x, y) {
        return this._layers.filter(layer=>this.filter(layer) && layer.isContains(x, y));
    }

    render() {
        this.clear();
        this.ctx.save();
        this.ctx.translate(this.padding[0], this.padding[1]);

        const models = this.collection.filter(this.filter, this).reverse();
        this.axisY.draw(this);
        this.clip([-5, -5, 5, 5]);

        models
            .map(model=> this._layers[model.id])
            .forEach(layer=> {
                layer.draw(this, this.selected === layer);
            }, this);


        this.ctx.restore();
        return this;

    }

    setSelected(id) {
        this.selected = this._layers[id];
        return this;
    }
}


export class Marker {

    get ctx() {
        if (!this._ctx) {
            this._ctx = this._canvas.getContext('2d');
            //this._ctx.globalCompositeOperation = 'source-over';
        }
        return this._ctx;
    }

    get width() {
        return this._chart.width;
    }

    get height() {
        return this._chart.height;

    }

    constructor(container, chart) {
        this._chart = chart;
        this.$container = $(container);
        const {width, height, padding} =  chart;

        this._canvas = $(`<canvas  class="chart"/>`)
            .attr({width, height})
            .css({top: padding[0], left: padding[1]}).get(0);
        $(container).append(this._canvas);
        //document.createElement('canvar')
        $(this._canvas).on('mousemove', this.onMove.bind(this))
        $(this._canvas).on('mouseout', this.clear.bind(this))
    }

    onMove(e) {
        //console.log((e.offsetX + ':' + e.offsetY));
        this.clear();
        this.drawLine(this.width, e.offsetY);
    }

    clear() {
        this.ctx.clearRect(0, 0, this._chart.width * 2, this._chart.height * 2);
    }

    drawLine(width, y) {
        this.ctx.beginPath();
        this.ctx.setLineDash([5]);
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();

    }
}

