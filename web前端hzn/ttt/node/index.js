const express = require('express')
const app = express()
const port = 3000
const data=require('./data/data.js')//配置静态json数组
const mysql = require('mysql');

// app.get('/',(req,res)=>{
//     res.send(data);
// })
// 连接数据库
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'jsweb'
});
connection.connect();
//登录
app.get('/login', (req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin","*")
    const username = req.query.username;
    const password = req.query.password;
    const sql = `select * from test where user_name = '${username}' and user_password = '${password}'`;
    connection.query(sql, (err, result) =>{
        console.log(result)
        if (err || result.length == 0) {
            res.status(200),
                res.json("登陆失败")
        } else {
            res.status(200),
                res.json("登陆成功")
            //重定向

        }
    // connection.end();
    })
})

//注册
app.get('/registered',(req,res)=>{
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin","*")
    //绑定前端
    const response = {
        "username":req.query.username,
        "password":req.query.password
    };
    //增
    const  addSql = 'INSERT INTO test(user_id, user_name, user_password) VALUES(0,?,?)';
    const  addSqlParams = [response.username, response.password];

    connection.query(addSql,addSqlParams,(err, result) => {
        console.log(result);
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            res.send('该用户已注册');
            return;
        }
        res.send('注册成功');
    });
})


app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
