const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const money_less = (card_num, card_money) => {
    card_money = -card_money;
    card_num = escape(card_num)
    card_money = escape(card_money)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}

const money_more = (card_num, card_money) => {
    card_num = escape(card_num)
    card_money = escape(card_money)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}
const create_saving = (user_id, saving_money, rate, interval) => {
    user_id = escape(user_id)
    saving_money = escape(saving_money)
    rate = escape(rate)
    interval = escape(interval)
    const sql = `insert into saving(user_id,saving_money,rate,saving_time,due_time)
    values(${xss(user_id)},${xss(saving_money)},${xss(rate)},current_date(),date_add(current_date(),INTERVAL ${xss(interval)} YEAR));`
    return exec(sql).then(rows => {
        console.log(rows.affectedRows);
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            res.send('存款失败')
            return
        }
    })
}
const show_saving = (uid) => {
    uid = escape(uid)
    const sql = `select saving_num,saving_time,due_time,saving_money 
    from saving where user_id = ${xss(uid)};`
    return exec(sql).then(rows => {
        return (rows || {})
    }, (err) => {
        if (err) {
            console.log('[show_saving ERROR] - ', err.message)
            res.send('存款失败')
            return
        }
    })
}
const withdraw_saving = (uid, card_num, saving_num) => {
    uid = escape(uid)
    card_num = escape(card_num)
    saving_num = escape(saving_num)
    const sql = `update user_card, saving set card_money = CASE 
    WHEN saving_time = due_time 
    THEN truncate(card_money + saving_money *pow(1+rate/360,datediff(current_date(),saving_time)), 2)
    WHEN due_time > saving_time 
    THEN truncate(card_money + saving_money *pow(1+rate,(year(due_time)-year(saving_time))), 2) 
    END
    where card_num = ${xss(card_num)} 
        and user_card.user_id = saving.user_id 
        and saving.user_id = ${xss(uid)} 
        and saving_num =  ${xss(saving_num)}  
        and current_date()>=due_time;`
    return exec(sql).then(rows => {
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[show_saving ERROR] - ', err.message)
            res.send('存款失败')
            return
        }
    })
}
const del_saving = (saving_num) => {
    saving_num = escape(saving_num)
    const sql = `delete from saving where user_id = '100' and saving_num =${xss(saving_num)};`
    return exec(sql).then(rows => {
        return Promise.resolve(rows.affectedRows)
    }, (err) => {
        if (err) {
            console.log('[show_saving ERROR] - ', err.message)
            res.send('存款失败')
            return
        }
    })
}
module.exports = {
    create_saving,
    show_saving,
    withdraw_saving,
    del_saving
}