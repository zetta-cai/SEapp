const { campus_show, campus_change, campus_showmoney } = require("../controller/campus.js");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/show', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid };
    var checked = req.body.checked;
    console.log(req.body)
    const result = campus_show(user.uid)
    return result.then(campusData => {
        if (campusData) {
            console.log('campusData query')
            console.log(campusData)
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    student_num: campusData.student_num,
                    account_num: campusData.account_num,
                    uid: user.uid
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
    })
});
router.post('/showmoney', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid };
    var checked = req.body.checked;
    console.log(req.body)
    const result = campus_showmoney(user.uid)
    return result.then(campusData => {
        if (campusData) {
            console.log('campus_showmoney query', campusData)
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    money: campusData.remain_money,
                    uid: user.uid
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
    })
});
router.post('/change', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid, money: req.body.money };
    var checked = req.body.checked;
    console.log(req.body)
    const result = campus_change(user.uid, user.money)
    console.log(result)
    return result.then(campusData => {
        console.log('campusData', campusData)
        if (campusData) {
            console.log('campusData query')
            console.log(campusData)
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
    }).catch(err => {
        res.sendStatus(404);
    })
});
module.exports = router
