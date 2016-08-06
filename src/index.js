/**
 * Created by Администратор on 16.07.2016.
 */
import './index.css'
import App from './modules/app'
//import './modules/reload'
const app = new App();

app.on('all', function () {
    console.info(arguments);
})
const $ = require('jquery')

$.get('/api/test', (d)=> {
    console.log(d);
    //alert(d)
})

//console.log(app);

// app.isAuth = true;
//
// app.save('./save');