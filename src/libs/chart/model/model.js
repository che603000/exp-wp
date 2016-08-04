/**
 * Created by Администратор on 16.07.2016.
 */
"use strict";


export default  class Model {

    get id() {
        return this._data.id;
    }

    get minX() {
        return this._minX;
    }

    get maxX() {
        return this._maxX;
    }

    get minY() {
        return this._minY;
    }

    get maxY() {
        return this._maxY;
    }

    constructor(data, options) {
        this._data = data;
        this._options = options;
        this.calculation();
    }

    calculation() {

    }
}