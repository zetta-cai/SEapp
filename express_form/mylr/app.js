var express = require('express');
var app = express();  //启动一个express应用
var bodyParser = require('body-parser');//解析req.body
var cookie = require('cookie-parser');
var login = require('./src/router/login');
var register = require('./src/router/register');
var userinfo = require('./src/router/userinfo');
var card_op = require('./src/router/card_op');
var money_op = require('./src/router/money_op.js');
var campus = require('./src/router/campus_info')
var phone = require('./src/router/phone')
var history = require('./src/router/history')
// var bound = require('./src/router/bound');
var session = require('express-session');
var cors = require('cors')
app.use(session({
    secret: 'secret',
    resave: false,   //设置了cookie的maxAge的话，一般为false
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 800000 },
}));
app.use(express.urlencoded({ extend: false }))
app.use(cookie());
app.use(cors());
app.use('/', login);
app.use('/', register);
app.use('/api/user/info', userinfo);
app.use('/api/card', card_op);
app.use('/api/third/campus', campus);
app.use('/api/third/phone', phone);
app.use('/api/money', money_op);
app.use('/api/history', history);
// app.use('/api/card/bound', bound);
module.exports = app


