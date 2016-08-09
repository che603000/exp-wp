/**
 * Created by Администратор on 16.07.2016.
 */
//const webix = require('webix/codebase/webix');

//import  webix from 'webix'///codebase/webix.js'

//console.log(webix);

import "./ui/map";
import {login, profile} from "./ui/menus";

console.log(login);


webix.ui({
    rows: [
        {
            view: "toolbar",
            //disabled:true,
            cols: [
                {type: 'header', template: 'FPLN-8', width: 300, border: false},
                //{ view:"button", id:"LoadBut", value:"Load", width:100, align:"left" },
                {},
                {
                    view: "button", value: "Save", width: 100, align: "right", click: (name, e)=> {
                    //console.log(name);
                    const panel = $$('panel-menu')
                    panel.getChildViews().forEach((v, i) => console.log(panel.getIdByIndex(i)));
                    //panel.getChildViews().forEach(view => panel.removeView(view.config.id));
                    //panel.addView(login)
                }
                },

                {view: "button", value: "Info", width: 100, align: "right", click: (name, e)=> {
                    //console.log(name);
                    const panel = $$('panel-menu')
                    //panel.removeView(profile.id)
                    panel.addView(profile)
                }}
            ]
        }, // menu toolbar
        {
            cols: [
                {
                    id: 'panel-menu',
                    maxWidth: 400,
                    width: 300,
                    minWidth: 200,
                    rows: []
                },
                {
                    view: "resizer"
                },
                // {
                //     rows: [
                //         {
                //             view: "leaflet-map",
                //             //id:"map",
                //             zoom: 7,
                //             center: [56, 43],
                //
                //
                //         },
                //         {view: "resizer", hidden: false},
                //         {template: "<p>Tree</p>", height: 50, hidden: 'auto'},
                //
                //     ]
                // },  // map
            ]
        }
    ]
});