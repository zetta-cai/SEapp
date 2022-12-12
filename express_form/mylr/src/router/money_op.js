const { user_check, user_register } = require("../controller/user");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
const { card_show, card_bound, card_show_money, card_check_user, card_check_card, update_money } = require("../controller/card");
const { create_saving, show_saving, withdraw_saving, del_saving } = require("../controller/money");
var router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/deposit', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = {
        uid: decoded.uid,
        money: req.body.money,
        card_num: req.body.card_num,
        interval: req.body.interval,
        rate: req.body.rate
    };
    console.log(user);
    if (user.uid == '' || user.card_num == '' || user.interval == '' || user.money == '') {
        var ret = {
            message: "失败",
            errno: -1,
        }
        console.log(ret)
        res.sendStatus(404);
        // res.send(ret)
        return
    }
    const result = update_money(user.card_num, -user.money)
    return result.then(moneydata => {
        if (moneydata == 1) {
            return create_saving(user.uid, user.money, user.rate, user.interval).then(
                saving => {
                    if (saving == 1) {
                        var ret = {
                            "success": true,
                            "code": 20001,
                            "message": "成功",
                            "data": {
                                user_id: user.uid
                            }
                        }
                        console.log(ret)
                        res.send(ret)
                        return
                    }
                    else {
                        update_money(user.card_num, user.money)
                        res.sendStatus(404);
                    }
                }).catch(err => {
                    update_money(user.card_num, user.money)
                    res.sendStatus(404);
                })
        }
        else {
            res.sendStatus(404);
            return
        }
    })
})

router.post('/withdraw', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = {
        uid: decoded.uid,
        card_num: req.body.card_num,
        saving_num: req.body.saving_num
    };
    console.log(user);
    if (user.uid == '' || user.card_num == '' || user.saving_num == '') {
        var ret = {
            message: "失败",
            errno: -1,
        }
        console.log(ret)
        res.sendStatus(404);
        // res.send(ret)
        return
    }
    const result = withdraw_saving(user.uid, user.card_num, user.saving_num)
    return result.then(moneydata => {
        if (moneydata == 1) {
            del_saving(user.saving_num)
            var ret = {
                "success": true,
                "code": 20000,
                "message": "成功",
                "data": {
                }
            }
            console.log(ret)
            res.send(ret)
            return
        }
        else {
            res.sendStatus(404);
            return
        }
    })
})

router.post('/show', upload.array(), function (req, res, next) {
    
    console.log(req.body)
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid };
    var checked = req.body.checked;
    if (user.uid == '') {
        // req.session.message = '<div style="position:fixed;top:0;color:red;width:100%;">账号或密码不能为空！</div>';
        res.sendStatus(404);
    } else {
        const result = show_saving(user.uid)
        return result.then(saving => {
            console.log(saving)
            if (saving) {
                var str1 = ""
                for (obj in saving) {
                    console.log(saving[obj])
                    str1 = str1
                        + JSON.stringify(saving[obj].saving_num) + " "
                        + saving[obj].saving_time.toJSON().substr(0, 10) + " "
                        + (saving[obj].saving_time - saving[obj].due_time == 0 ?
                            "活期" :
                            saving[obj].due_time.toJSON().substr(0, 10)) + " "
                        + JSON.stringify(saving[obj].saving_money)
                        + "\n"
                }
                console.log(str1)
                var ret = {
                    "success": true,
                    "code": 20000,
                    "message": "成功",
                    "data": {
                        str1: str1
                    }
                }
                console.log(ret)
                res.send(ret)
                return
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            res.sendStatus(404);
        });
    }
})
module.exports = router