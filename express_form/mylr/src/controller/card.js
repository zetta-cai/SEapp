const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const card_bound=(user_id, card_num)=> {
    user_id = escape(user_id)
    card_num = escape(card_num)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}

const card_rmbound=(user_id, card_num)=> {
    user_id = escape(user_id)
    card_num = escape(card_num)
    const sql = `select user_id,user_name  from user 
    where user_name=${xss(username)} and user_password=${xss(password)};`
}
module.exports{
    card_bound,
    card_rmbound
}