/**
 * Created by alex on 04.08.2016.
 */
//const Backbone =

import Backbone from "backbone";


export class Event {

}

Event.prototype = {
    get _private(){
        throw 'переопределите свойство...';
    },
    __setProp(propName, value, eventName){
        if (!this.__isEqual(this._private[propName], value)) {
            this._private[propName] = value;
            eventName && this.trigger(eventName, this, value);
        }
    },
    __isEqual(value1, value2) {
        return value1.isEqual ? value1.isEqual(value2) : (value1 === value2);

    },
    ...Backbone.Events
};