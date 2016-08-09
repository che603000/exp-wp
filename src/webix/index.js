/**
 * Created by Администратор on 09.08.2016.
 */
"use strict";
import './index.css'

import {login, info} from './menus'

webix.ui.fullScreen();
webix.ui({
    //container:"map", //corresponds to the ID of the div block
    rows: [
        {
            id: 'panel-menu',
            view: "toolbar",
            //disabled:true,
            cols: [
                {type: 'header', template: 'FPLN-8'},
                {},
                {
                    view: "button", value: "Save", width: 100, align: "right", click: function (name, e) {
                    console.log(name, this);
                    const panel = $$('info'), info = $$('info'),
                        action = info.isVisible() ? 'hide' : 'show';
                    //info.addView(login,0)
                    //info.template='save';
                    $$('r')[action]();
                    info[action]();
                    //console.log(info);
                }
                },
            ]
        },
        {
            cols: [
                info,
                {id: 'r', view: "resizer", hidden: false},
                {template: "col 2"},
            ]
        },

    ],

});