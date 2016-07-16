/**
 * Created by alex on 13.07.2016.
 */


import  './index.css'

const $ = require('jquery');


import Chart from "./view/chart";
import {AxisX, AxisY} from "./test/axis";
import Rect from "./test/rect";
import Model from "./test/model";

//import Rect from "./rect";

const chart = new Chart(document.getElementById('cnv'), {
    axisX: AxisX,
    axisY: AxisY,
    model: Model,
    padding:[30,30,40,30]
});


chart.add(new Rect(new Model({
    id: 'blue',
    alts: {min: 0, max: 700},
    area: 30000
}), {style: {strokeStyle: 'blue', fillStyle: 'rgba(0,0,100,0.5)'}}))


chart.add(new Rect(new Model({
    id: 'red',
    alts: {min: 500, max: 1300},
    area: 3000,
}), {style: {strokeStyle: 'red', fillStyle: 'rgba(100,0,0,0.5)'}}))


chart.add(new Rect(new Model({
    id: 'black',
    alts: {min: 300, max: 3500000},
    area: 30
}), {}))


chart.setSelected('red')
chart.render();
//
// $('#cnv').on('click', e=> {
//     //debugger;
//     //$position.text(e.offsetX + ':' + e.offsetY);
//     console.log((e.offsetX + ':' + e.offsetY));
//     ;
//     const sel = chart.getLayers(e.offsetX, e.offsetY);
//     console.log(sel);
//     sel.length && chart.select(sel[0].id).render();
// });
//
//

setTimeout(()=> {
    chart.setFilter(['red','blue']).render();
}, 2000)


setTimeout(()=> {
    chart.setFilter([]).render();
}, 4000)

setTimeout(()=> {
    chart.setSelected(null).render();
}, 5000)
