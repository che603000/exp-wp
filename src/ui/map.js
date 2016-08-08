/**
 * Created by Александр on 08.08.2016.
 */

import L from 'leaflet'

webix.protoUI({
    name: "leaflet-map",
    $init: function () {
        this.$view.innerHTML = "<div class='webix_map_content' style='width:100%;height:100%'></div>";
        this._contentobj = this.$view.firstChild;

        this.map = null;
        this.$ready.push(this.render);
    },
    render: function () {
        this._initMap();
    },
    _initMap: function (define) {
        var c = this.config;

        this.map = L.map(this._contentobj);
        //this.map.setView(c.center, c.zoom);


        var delayDraw = function (map) {
            return function () {
                map.setView(c.center, c.zoom);
            }
        }
        setTimeout(delayDraw(this.map), 500);


        L.tileLayer(c.layer, {
            attribution: c.attribution
        }).addTo(this.map);

    },

    defaults: {
        zoom: 5,
        center: [39.5, -98.5],
        layer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }
}, webix.ui.view);