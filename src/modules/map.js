/**
 * Created by Александр on 06.08.2016.
 */

import  L from 'leaflet'


L.Icon.Default.imagePath = '/images'

const mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09], {
    icon:  L.divIcon({
        className: 'icon-marker-icon',
        iconSize:[25,41]
    })
}).addTo(mymap);