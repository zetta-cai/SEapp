const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const history_insert = (out__id, out_card_num, in__id, in_card_num, transactions_money) => {
    out__id = escape(out__id)
    out_card_num = escape(out_card_num)
    in__id = escape(in__id)
    in_card_num = escape(in_card_num)
    transactions_money = escape(parseFloat(transactions_money))
    const sql_out = `INSERT INTO transactions_history (transactions_type,my_id,my_card_num,the_other_id,the_other_card_num,transactions_money,transactions_time)VALUES('out',${xss(out__id)}, ${xss(out_card_num)},${xss(in__id)}, ${xss(in_card_num)}, ${xss(transactions_money)},now());`
    const sql_in = `INSERT INTO transactions_history (transactions_type,my_id,my_card_num,the_other_id,the_other_card_num,transactions_money,transactions_time)VALUES('in', ${xss(in__id)}, ${xss(in_card_num)},${xss(out__id)}, ${xss(out_card_num)},${xss(transactions_money)},now());`
    exec(sql_out)
    exec(sql_in)
}
const history_show = (uid) => {
    uid = escape(uid)
    const sql=`select transactions_type,my_id,my_card_num,the_other_card_num,transactions_money,transactions_time 
    from transactions_history
    where my_id = ${xss(uid)}
    order by transactions_time DESC;`
    return exec(sql).then(rows => {
        return (rows || {})
    }, (err) => {
        if (err) {
            console.log('[card_check_card ERROR] - ', err.message)
            return
        }
    })
}
module.exports = {
    history_insert,
    history_show
}