/**
 * Created by alex on 13.07.2016.
 */


import  './index.css'

const $ = require('jquery');


import Chart from "./chart";
import Rect from "./rect";

const chart = new Chart(document.getElementById('cnv'));

chart.add(new Rect({
    id: 'blue',
    alts: {min: 0, max: 1400},
    area: 30000000
}, {strokeStyle: 'blue', fillStyle: 'rgba(0,0,100,0.5)'}))


chart.add(new Rect({
    id: 'red',
    alts: {min: 300, max: 9000},
    area: 3000,
}, {strokeStyle: 'red', fillStyle: 'rgba(100,0,0,0.5)'}))


chart.add(new Rect({
    id: 'black',
    alts: {min: 500, max: 3500},
    area: 30
}, {}))


chart.render();

$('#cnv').on('click', e=> {
    //debugger;
    //$position.text(e.offsetX + ':' + e.offsetY);
    console.log((e.offsetX + ':' + e.offsetY));;
    const sel = chart.getLayers(e.offsetX, e.offsetY);
    console.log(sel);
    sel.length && chart.select(sel[0].id).render();
});


setTimeout(()=> {
    chart.setFilter(['red']).render();
}, 2000)



setTimeout(()=> {
    chart.setFilter([]).render();
}, 4000)

setTimeout(()=> {
    chart.select(null).render();
}, 6000)
