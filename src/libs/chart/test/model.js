/**
 * Created by Администратор on 16.07.2016.
 */
"use strict";

import Base from '../data/model'

export default class Model extends Base {

    MAXY = 12000

    get minX() {
        return 1;
    }

    get maxX() {
        return Math.log(parseInt(this._data.area))
    }

    get minY() {
        return this._data.alts.min;
    }

    get maxY() {
        return this._data.alts.max > this.MAXY ? this.MAXY : this._data.alts.max;
    }

    calculation() {
    }
}