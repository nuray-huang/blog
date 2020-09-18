const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const session = require('express-session');
require('./model/connect');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret key' }));

const home = require('./route/home');
const admin = require('./route/admin');

app.use('/admin', require('./middleware/loginGuard'));
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    let msg;
    let dataType = typeof resp == 'string';
    if (dataType) {
        const result = JSON.parse(err);
        res.redirect(`${result.path}?message=${result.message}`);
    } else {
        let errormsg = result.msg;
        msg = errormsg.address + ':' + errormsg.port + ' ' + '请检查访问地址后重试.';
        alert(msg)
    }

})

app.listen(80);
console.log('服务器启动成功');