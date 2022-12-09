const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const campus_show = (user_id) => {
    user_id = escape(user_id)
    const sql = `select student_num, account_num
    from campus_card, user_card
    where campus_card.account_num = user_card.card_num and user_card.user_id = ${xss(user_id)};`
    return exec(sql).then(rows => {
        console.log('campus_show success');
        return (rows[0] || {})
    }, (err) => {
        if (err) {
            console.log('[select ERROR] - ', err.message)
            res.send('该用户已注册')
            return
        }
    })
}

const campus_change = (user_id, money) => {
    user_id = escape(user_id)
    money = escape(parseFloat(money))
    // console.log(user_id)
    // console.log(money)
    const sql_have_campus = `select student_num 
    from campus_card, user_card
    where account_num = card_num and user_id = ${xss(user_id)};`
    const sql_money_enough = `
    select count(account_num) as succ from campus_card,user_card 
    where account_num = card_num and user_id = ${xss(user_id)} and card_money >=  ${xss(money)};`
    const sql_money_card = `update user_card set card_money = card_money - ${xss(money)} 
    where card_num in 
    (select account_num from
        (select account_num from campus_card,user_card 
        where account_num = card_num and user_id = ${xss(user_id)})a);`
    const sql_money_campus = `update campus_card set remain_money = remain_money +  ${xss(money)} 
    where student_num in 
    (select student_num from
        (select student_num from campus_card,user_card 
            where account_num = card_num and user_id = ${xss(user_id)})a);`
    return new Promise((resolve, reject) => {
        return exec(sql_have_campus).then(result => {
            console.log('(result[0] || {}).student_num', (result[0] || {}).student_num);
            if ((result[0] || {}).student_num == undefined) {
                console.log('[sql_have_campus ERROR] - ')
                // res.send('没卡')
                reject((result[0] || {}).student_num)
                return
            }
            return exec(sql_money_enough).then(result => {
                console.log('result[0].succ', result[0].succ);
                if ((result[0] || {}).succ == undefined || (result[0] || {}).succ == 0) {
                    console.log('[sql_money_enough ERROR] - ')
                    // res.send('没钱')
                    reject((result[0] || {}).succ)
                    return
                }
                return exec(sql_money_card).then(result => {
                    return exec(sql_money_campus).then(result => {
                        console.log(123)
                        resolve(1)
                    }), (err) => {}
                }), (err) => {}
            }), (err) => {}
        }), (err) => {}
    })
    // if (((result[0] || {})).student_num) {
    //     console.log((result[0] || {}));
    //     exec(sql_money_enough).then(rows_2 => {
    //         console.log('(rows_2[0] || {}).succ', (rows_2[0] || {}).succ);
    //         if (((rows_2[0] || {})).succ == 1) {
    //             // console.log((rows_2[0] || {}).succ);
    //             exec(sql_money_card)
    //             exec(sql_money_campus)
    //             console.log('(rows_2[0] || {}).succ', (rows_2[0] || {}).succ);
    //             return (rows_2[0] || {}).succ
    //         }
    //         else {
    //             console.log('[sql_money_enough ERROR] - ')
    //             // res.send('没钱')
    //             return
    //         }
    //     }, (err) => {
    //         if (err) {
    //             console.log('[sql_money_enough ERROR] - ')
    //             // res.send('没钱')
    //             return
    //         }
    //     })
    // }
    // else {
    //     console.log('[sql_have_campus ERROR] - ')
    //     // res.send('没卡')
    //     return
    // }

}

module.exports = {
    campus_show,
    campus_change
}