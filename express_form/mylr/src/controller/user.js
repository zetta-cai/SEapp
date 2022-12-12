const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const user_login = (username, password) => {
    // 用escape函数把传入的参数包一下，这样子里面任何sql的特殊符号都会被转义
    username = escape(username)
    password = escape(password)
    // console.log(username,password)
    // 拼接sql语句
    // 用xss函数包裹一下传入的变量就好了，但是要注意，
    //包裹之后的变量外面需要加一层引号，可以对比一下password和username两个地方'${xss(username)} '
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
    // 调用我们封装的sql语句执行函数，依旧返回一个promise。
    return exec(sql).then(rows => {
        // sql查出来是“行”数组形式
        console.log(rows)
        return (rows[0] || {})
    })
}
const user_check = (user_id, password) => {
    user_id = escape(user_id)
    password = escape(password)
    const sql = `select user_id,user_name  from user 
    where user_id=${xss(user_id)} and user_password=${xss(password)};`
    return exec(sql).then(rows => {
        // sql查出来是“行”数组形式
        console.log(rows)
        return (rows[0] || {})
    })
}
const user_register = (user_id, username, password) => {
    // 用escape函数把传入的参数包一下，这样子里面任何sql的特殊符号都会被转义
    user_id = escape(user_id)
    username = escape(username)
    password = escape(password)
    // 拼接sql语句
    // 用xss函数包裹一下传入的变量就好了，但是要注意，
    //包裹之后的变量外面需要加一层引号，可以对比一下password和username两个地方'${xss(username)} '
    const addSql = `INSERT INTO user(user_id, user_name, user_password) 
            VALUES(${xss(user_id)},${xss(username)},${xss(password)});`
    // const addSqlParams = {xss(user_id), xss(username), xss(password)};
    // console.log((user_id, username, password))
    return exec(addSql).then(rows => {
        console.log('注册成功');
        return 1
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
    // connection.query(addSql, addSqlParams, (err, result) => {
    //     console.log(result);
    //     if (err) {
    //         console.log('[INSERT ERROR] - ', err.message);
    //         res.send('该用户已注册');
    //         return;
    //     }
    //     res.send('注册成功');
    // })
}

const user_info_register = (user_id) => {
    user_id = escape(user_id)
    const addSql = `INSERT INTO user_info(user_id) 
            VALUES(${xss(user_id)});`
    return exec(addSql).then(rows => {
        console.log('user_info注册成功');
        return 1
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}
const user_info_show = (user_id) => {
    console.log(user_id)
    user_id = escape(user_id)
    const addSql = `select user.user_id, user_tel, user_real_name, user_addr ,user_email, user_gender,user.user_name
    from user_info,user
    where user.user_id = ${xss(user_id)} and user_info.user_id = ${xss(user_id)};`
    return exec(addSql).then(rows => {
        console.log('user_info_show success', (rows[0] || {}));
        return (rows[0] || {})
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}
const user_name_change = (user_id, user_real_name) => {
    user_id = escape(user_id)
    user_real_name = escape(user_real_name)
    const addSql = `update user_info 
    set user_real_name = ${xss(user_real_name)}
    where user_id = ${xss(user_id)};`
    console.log(addSql)
    return exec(addSql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}

const user_gender_change = (user_id, gender) => {
    user_id = escape(user_id)
    gender = escape(gender)
    const addSql = `update user_info 
    set user_gender = ${xss(gender)}
    where user_id = ${xss(user_id)};`
    console.log(addSql)
    return exec(addSql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}

const user_email_change = (user_id, email) => {
    user_id = escape(user_id)
    email = escape(email)
    const addSql = `update user_info 
    set user_email = ${xss(email)}
    where user_id = ${xss(user_id)};`
    console.log(addSql)
    return exec(addSql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}
const user_addr_change = (user_id, addr) => {
    user_id = escape(user_id)
    addr = escape(addr)
    const addSql = `update user_info 
    set user_addr = ${xss(addr)}
    where user_id = ${xss(user_id)};`
    console.log(addSql)
    return exec(addSql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}
const user_tel_change = (user_id, tel) => {
    user_id = escape(user_id)
    tel = escape(tel)
    const addSql = `update user_info 
    set user_tel = ${xss(tel)}
    where user_id = ${xss(user_id)};`
    console.log(addSql)
    return exec(addSql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}
module.exports = {
    user_login,
    user_register,
    user_info_register,
    user_info_show,
    user_name_change,
    user_gender_change, 
    user_email_change,
    user_addr_change,
    user_tel_change,
    user_check
}
