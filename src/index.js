/**
 * Created by Администратор on 16.07.2016.
 */
//const webix = require('webix/codebase/webix');

//import  webix from 'webix'///codebase/webix.js'

//console.log(webix);

import './ui/map'

webix.ui({
    rows: [
        //{type: "header", template: "FPLN 7 WAW"},
        {
            cols: [
                {template: "<p>Tree</p>", width: 250},
                {view: "resizer"},
                {
                    rows: [
                        {
                            view: "leaflet-map",
                            //id:"map",
                            zoom: 7,
                            center: [56, 43]

                        },
                        {view: "resizer",  hidden:false},
                        {template: "<p>Tree</p>", height: 50, hidden:'auto'},

                    ]
                },
            ]
        }
    ]
});