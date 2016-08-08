/**
 * Created by alex on 04.08.2016.
 */
import {Event} from "./base-class";
import $ from "jquery";

const _private = {
    isAuth: false,
    user:''
};

export default class App extends Event {

    className = 'app'

    get _private() {
        return _private;
    }

    get isAuth() {
        return this._private.isAuth;
    }

    set isAuth(value) {
        this.__setProp('isAuth', value, 'charge:auth');
    }

    get id(){
        return this._private['id'];
    }

    set id(value) {
        this.__setProp('id', value, 'charge:id');
    }

    get user(){
        return this._private['user'];
    }

    set user(value) {
        this.__setProp('user', value, 'charge:user');
    }

    save(url) {
        const {isAuth, className} = this;
        $.post(url, {isAuth, className})
            .done((data)=> {
                this.trigger('sync', this, data);
            })
            .fail((xhr)=> {
                this.trigger('error', this, xhr);
            });
    }
}




