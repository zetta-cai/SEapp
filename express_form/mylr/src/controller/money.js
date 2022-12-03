const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const money_less=(card_num, card_money)=> {
    card_money=-card_money;
    card_num = escape(card_num)
    card_money = escape(card_money)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}

const money_more=(card_num, card_money)=> {
    card_num = escape(card_num)
    card_money = escape(card_money)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}
