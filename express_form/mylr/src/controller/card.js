const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const card_show_money = (user_id, card_num) => {
    user_id = escape(user_id)
    card_num = escape(card_num)
    const sql = `select card_money from user_card 
    where card_num = ${xss(card_num)}and user_id= ${xss(user_id)};`
    return exec(sql).then(rows => {
        console.log('card_show_money success');
        return (rows[0] || {})
    }, (err) => {
        if (err) {
            console.log('[card_show_money ERROR] - ', err.message)
            return
        }
    })
}
const card_show = (user_id) => {
    user_id = escape(user_id)
    const sql = `select card_num 
    from user_card where user_id = ${xss(user_id)};`
    return exec(sql).then(rows => {
        console.log('campus_show success');
        return (rows || {})
    }, (err) => {
        if (err) {
            console.log('[card_show ERROR] - ', err.message)
            return
        }
    })
}
const card_bound = (user_id, card_num) => {
    user_id = escape(user_id)
    card_num = escape(card_num)
    console.log("in", user_id, card_num)
    const sql_can = `select user_id from user_card where card_num = ${xss(card_num)};`
    const sql_bound = `update user_card set user_id =${xss(user_id)}   
    where card_num = ${xss(card_num)};`
    return new Promise((resolve, reject) => {
        return exec(sql_can).then(result => {
            console.log('(result[0] || {}).user_id', (result[0] || {}).user_id);
            if ((result[0] || {}).user_id == null) {
                return exec(sql_bound).then(result => {
                    if (result.affectedRows == 1) {
                        console.log(result)
                        resolve(1)
                        return
                    }
                    resolve(-1)
                    return
                })
            }
            else {
                resolve(-1)
                return
            }
        })
    })
}

const card_check_card = (in_card) => {
    in_card = escape(in_card)
    const sql = `select user_id,count(card_num) as card_check_succ from user_card where card_num = ${xss(in_card)};`
    return exec(sql).then(rows => {
        console.log('card_check_user', rows)
        return (rows[0] || {})
    }, (err) => {
        if (err) {
            console.log('[card_check_card ERROR] - ', err.message)
            return
        }
    })
}
const card_check_user = (uid, money, out_card) => {
    uid = escape(uid)
    money = escape(money)
    out_card = escape(out_card)
    const sql = `select count(card_num) as user_check_succ
    from user_card 
    where card_num = ${xss(out_card)} and card_money >= ${xss(money)} and user_id = ${xss(uid)};`
    return exec(sql).then(rows => {
        console.log('card_check_user', rows)
        return (rows[0] || {})
    }, (err) => {
        if (err) {
            console.log('[card_check_user ERROR] - ', err.message)
            return
        }
    })
}
const update_money = (card_num, money) => {
    card_num = escape(card_num)
    money = escape(parseFloat(money))
    const sql = `update user_card 
    set card_money = card_money + ${xss(money)} 
    where card_num =  ${xss(card_num)} and card_money + ${xss(money)} >=0;`
    // console.log('sql',sql)
    return exec(sql).then(rows => {
        console.log('update_money', rows.affectedRows)
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[update_money ERROR] - ', err.message)
            return
        }
    })
}
module.exports = {
    card_show,
    card_bound,
    card_show_money,
    card_check_user,
    card_check_card,
    update_money
}