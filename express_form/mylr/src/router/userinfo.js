const { user_info_show, user_name_change, user_gender_change, user_email_change, user_addr_change, user_tel_change } = require("../controller/user");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/show', upload.array(), function (req, res, next) {

    // let strings = user.uid.split("."); //截取token，获取载体
    // var usertoken = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    // console.log(usertoken)
    // var strings = data.data.normal_login_token.split(".");//通过split()方法将token转为字符串数组
    // //取strings[1]数组中的第二个字符进行解析
    // var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    // //然后可以拿到解析后的数据，可以console.log()打印下，
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    // console.log(userinfo, 'userinfo');
    var user = { uid: decoded.uid };

    var checked = req.body.checked;
    console.log(req.body)
    const result = user_info_show(user.uid)
    return result.then(infoData => {
        if (infoData) {
            console.log('user_info query')
            // req.session.isFirst = 1;
            // res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true });
            // set_redis(req.sessionId, req.session)
            console.log(infoData)
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid,
                    user_id: user.uid,
                    user_tel: infoData.user_tel,
                    user_real_name: infoData.user_real_name,
                    user_addr: infoData.user_addr,
                    user_email: infoData.user_email,
                    user_gender: infoData.user_gender,
                    user_name: infoData.user_name
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
    return
    // if (user.username == '' || user.password == '') {
    //     req.session.message = '<div style="position:fixed;top:0;color:red;width:100%;">账号或密码不能为空！</div>';
    //     res.sendStatus(404);
    // } else {
    //     const result = user_check(user.user_id, genPassword(user.password))
    //     return result.then(checkrData => {
    //         if (checkData) {
    //             console.log('校验正确')
    //             const bound_res = card_boud(user.user_id, card_num)
    //             if (bound_res) {
    //                 var ret = {
    //                     "success": tcrue,
    //                     "code": 20000,
    //                     "message": "成功",
    //                     "data": {
    //                     }
    //                 } 
    //                 res.send(ret)
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     }).catch(err => {
    //         res.sendStatus(404);
    //     })
    // }
});
router.post('/name', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    // console.log(userinfo, 'userinfo');
    var user = { uid: decoded.uid, user_real_name: req.body.user_real_name };
    var checked = req.body.checked;
    console.log(req.body)
    const result = user_name_change(user.uid, user.user_real_name)
    return result.then(infoData => {
        if (infoData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid
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
router.post('/gender', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid, gender: req.body.gender };
    var checked = req.body.checked;
    console.log(req.body)
    const result = user_gender_change(user.uid, user.gender)
    return result.then(infoData => {
        if (infoData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid
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
router.post('/email', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid, email: req.body.email };
    var checked = req.body.checked;
    console.log(req.body)
    const result = user_email_change(user.uid, user.email)
    return result.then(infoData => {
        if (infoData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid
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
router.post('/addr', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid, addr: req.body.addr };
    var checked = req.body.checked;
    console.log(req.body)
    const result = user_addr_change(user.uid, user.addr)
    return result.then(infoData => {
        if (infoData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid
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
router.post('/tel', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid, tel: req.body.tel };
    var checked = req.body.checked;
    console.log(req.body)
    const result = user_tel_change(user.uid, user.tel)
    return result.then(infoData => {
        if (infoData == 1) {
            var ret = {
                "success": true,
                "code": 20001,
                "message": "成功",
                "data": {
                    uid: req.body.uid
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
module.exports = router
