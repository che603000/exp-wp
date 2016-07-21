/**
 * Created by Администратор on 16.07.2016.
 */
"use strict";

import Model from './model'

export default  class Collection {

    get model() {
        return this._options.model || Model;
    }

    get minX() {
        return this._minX;
    }

    get minY() {
        return this._minY;

    }

    get maxX() {
        return this._maxX;
    }

    get maxY() {
        return this._maxY;
    }

    constructor(models, options={}) {
        this._models = [].concat(models).map(this.create, this).sort(this.sort, this);
        this._options = options;
        this._keys = {};
        this.calculation();
    }

    filter(fn, context) {
        const models= this._models.filter(fn, context);
        this.calculation(models);
        return models;
    }

    sort(a, b) {
        return a.minY - b.minY
    }

    calculation(models=[]) {
        this._maxX = Math.max.apply(null, models.map(model=>model.maxX));
        this._minX = Math.min.apply(null, models.map(model=>model.minX));
        this._maxY = Math.max.apply(null, models.map(model=>model.maxY));
        this._minY = Math.min.apply(null, models.map(model=>model.minY));
        return this;
    }

    create(model) {
        return model instanceof Model ? model : new this.model(model);
    }

    add(model) {
        this._keys[model.id] = model;
        this._models.push(model);
        this._models = this._models.sort(this.sort, this);
        return this;
    }

    remove(id) {
        const index = this._models.indexOf(this._keys[id]);
        delete this._keys[id];
        this._models.splice(index, 1);
        return this;
    }

    get(id) {
        return this._keys[id];
    }

    _filter(){
        return true;
    }
}