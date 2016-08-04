/**
 * Created by Администратор on 16.07.2016.
 */
import './index.css'
import App from './modules/app'

const app = new App();

app.on('all', function(){
    console.info(arguments);
})

console.log(app);

app.isAuth = true;

app.save('./save');