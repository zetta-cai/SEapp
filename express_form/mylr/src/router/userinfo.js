const { user_info_show } = require("../controller/user");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
var router = express.Router();
router.post('/', upload.array(), function (req, res, next) {
    var user = { uid: req.body.uid };
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
                    user_id: infoData.user_id,
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
module.exports = router
