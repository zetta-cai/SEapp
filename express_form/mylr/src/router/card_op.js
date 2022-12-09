const { user_check } = require("../controller/user");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
const { card_show, card_bound, card_show_money, card_check_user, card_check_card, update_money } = require("../controller/card");
var router = express.Router();
router.post('/show', upload.array(), function (req, res, next) {
    var user = { uid: req.body.uid };
    var checked = req.body.checked;
    console.log(req.body)
    const result = card_show(user.uid)
    return result.then(cardData => {
        if (cardData) {
            var str1 = ""
            for (obj in cardData) {
                console.log(cardData[obj].card_num)
                str1 = str1 + cardData[obj].card_num + "\n"
            }
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    card_num: str1,
                    uid: user.uid
                }
            }
            console.log(ret)
            res.send(ret)
        }
    }).catch(err => {
        res.sendStatus(404);
    })
});
router.post('/bound', upload.array(), function (req, res, next) {
    var user = { uid: req.body.uid, card_num: req.body.card };
    if (user.uid == '' || user.card_num == '') {
        var ret = {
            message: "绑定失败",
            errno: -1,
        }
        console.log(ret)
        res.sendStatus(404);
        // res.send(ret)
        return
    }
    var checked = req.body.checked;
    console.log(req.body)
    const result = card_bound(user.uid, user.card_num)
    console.log('result', result)
    return result.then(cardData => {
        console.log('cardData', cardData)
        if (cardData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    card_num: cardData,
                    uid: user.uid
                }
            }
            console.log(ret)
            res.send(ret)
        }
        else {
            var ret = {
                message: "绑定失败",
                errno: -1,
            }
            console.log(ret)
            res.sendStatus(404);
            // res.send(ret)
        }
    }).catch(err => {
        res.sendStatus(404);
    })
});
router.post('/showmoney', upload.array(), function (req, res, next) {
    var user = { uid: req.body.uid, card_num: req.body.card };
    if (user.uid == '' || user.card_num == '') {
        var ret = {
            message: "绑定失败",
            errno: -1,
        }
        console.log(ret)
        res.sendStatus(404);
        // res.send(ret)
        return
    }
    var checked = req.body.checked;
    console.log(req.body)
    const result = card_show_money(user.uid, user.card_num)
    console.log('result', result)
    return result.then(cardData => {
        console.log('cardData', cardData.card_money)
        if (cardData) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    card_money: cardData.card_money,
                    uid: user.uid
                }
            }
            console.log(ret)
            res.send(ret)
        }
        else {
            var ret = {
                message: "绑定失败",
                errno: -1,
            }
            console.log(ret)
            res.sendStatus(404);
            // res.send(ret)
        }
    }).catch(err => {
        res.sendStatus(404);
    })
});

router.post('/changemoney', upload.array(), function (req, res, next) {
    var user = {
        uid: req.body.uid,
        money: req.body.money,
        in_card: req.body.in_card,
        out_card: req.body.out_card
    };
    if (user.uid == '' || user.card_num == '' || user.in_card == '' || user.out_card == '') {
        var ret = {
            message: "绑定失败",
            errno: -1,
        }
        console.log(ret)
        res.sendStatus(404);
        // res.send(ret)
        return
    }
    var checked = req.body.checked;
    console.log(req.body)
    const check_user = card_check_user(user.uid, user.money, user.out_card)
    const check_card = card_check_card(user.in_card)
    return check_user.then(check_userData => {
        console.log(check_userData.user_check_succ)
        if (check_userData.user_check_succ == 1) {
            return check_card.then(check_cardData => {
                console.log(check_cardData.card_check_succ)
                if (check_cardData.card_check_succ == 1) {
                    const update_out = update_money(user.out_card, -user.money)
                    return update_out.then(outdata => {
                        console.log('out', outdata)
                        const update_in = update_money(user.in_card, user.money)
                        if (outdata==1) {
                            return update_in.then(indata => {
                                console.log('in', indata)
                                if(indata==1){
                                    var ret = {
                                        "success": true,
                                        "code": 20001,
                                        "message": "成功",
                                        "data": {
                                            uid: user.uid
                                        }
                                    }
                                    console.log(ret)
                                    res.send(ret)
                                    return 
                                }
                                else {
                                    update_money(user.out_card, user.money)
                                    res.sendStatus(404);
                                    return 
                                }
                            })
                        }
                    })
                }
                else {
                    res.sendStatus(404);
                    return
                }
            })
        }
        else {
            res.sendStatus(404);
            return
        }
    })
    //console.log('check_user',check_user)
    //console.log('check_card',check_card)
    // const result = card_show_money(user.uid, user.card_num)
    // console.log('result', result)
    // return result.then(cardData => {
    //     console.log('cardData', cardData.card_money)
    //     if (cardData) {
    //         var ret = {
    //             "success": true,
    //             "code": 20001,
    //             "message": "成功",
    //             "data": {
    //                 card_money: cardData.card_money,
    //                 uid: user.uid
    //             }
    //         }
    //         console.log(ret)
    //         res.send(ret)
    //     }
    //     else {
    //         var ret = {
    //             message: "绑定失败",
    //             errno: -1,
    //         }
    //         console.log(ret)
    //         res.sendStatus(404);
    //         // res.send(ret)
    //     }
    // }).catch(err => {
    //     res.sendStatus(404);
    // })
});

module.exports = router