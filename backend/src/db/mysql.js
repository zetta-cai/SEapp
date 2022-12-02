const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')    // 来自上面的配置文件
// 创建一个mysql实例，因为这是一个单例，所以不会用到退出数据库
const con = mysql.createConnection(MYSQL_CONFIG)
// 连接数据库
con.connect()
// con.query是一个异步，且是回调的形式，所以我们将其封装成promise的形式，更方便使用
const exec = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            // console.log(err)
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
module.exports = {
    exec,
    escape: mysql.escape
}
