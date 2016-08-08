/**
 * Created by Администратор on 16.07.2016.
 */
//const webix = require('webix/codebase/webix');

//import  webix from 'webix'///codebase/webix.js'

//console.log(webix);

import "./ui/map";
import login from "./ui/login";

webix.ui({
    rows: [
        {
            view:"toolbar",
            disabled:true,
            cols:[
                {type:'header', template: 'FPLN-8', width: 300 , border: false},
                //{ view:"button", id:"LoadBut", value:"Load", width:100, align:"left" },
                {},
                { view:"button", value:"Save", width:100, align:"right" },

                { view:"button", value:"Info", width:100, align:"right" }]
        },
        {
            cols: [
                {
                    view: "accordion",
                    width: 400,
                    minWidth: 100,
                    //multi:true,
                    rows: [
                        login,
                        {header: "col 2", body: "content 2"},
                        {header: "col 3", body: "content 3"}
                    ]
                },
                {
                    view: "resizer"
                },
                {
                    rows: [
                        {
                            view: "leaflet-map",
                            //id:"map",
                            zoom: 7,
                            center: [56, 43],
                            //height: '800',

                        },
                        {view: "resizer", hidden: false},
                        {template: "<p>Tree</p>", height: 50, hidden: 'auto'},

                    ]
                },
            ]
        }
    ]
});