const { campus_show, campus_change, campus_showmoney } = require("../controller/campus.js");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
const { update_money } = require("../controller/card.js");
const jwt = require('jsonwebtoken');
var router = express.Router();
router.post('/', upload.array(), function (req, res, next) {
    // var decoded = jwt.decode(req.body.uid);
    // console.log(decoded);
    var user = { card_num: req.body.card_num, money: req.body.money }
    console.log(req.body)
    if (user.card_num == '' || user.money == '') {
        res.sendStatus(404);
        return
    }
    const result = update_money(user.card_num, -user.money)
    return result.then(moneydata => {
        if (moneydata == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                }
            }
            console.log(ret)
            res.send(ret)
        }
        else {
            res.sendStatus(404);
        }
    })
})
module.exports=router