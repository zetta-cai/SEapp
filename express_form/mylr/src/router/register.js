const { user_login, user_register,user_info_register } = require('../controller/user')
const { set_redis } = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../modules/Basemodule')
const { genPassword } = require('../utils/cryp')
const crypto = require('crypto')
var express = require('express');
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var router = express.Router();

router.post('/api/user/register', upload.array(), function (req, res, next) {
    // var hash = crypto.createHash("md5");
    // hash.update(req.body.password);
    // var password = hash.digest("hex");
    var user = { user_id: req.body.user_id, username: req.body.username, password: req.body.password };
    var checked = req.body.checked;
    console.log(req.body)
    if (user.username == '' || user.password == '') {
        req.session.message = '<div style="position:fixed;top:0;color:red;width:100%;">账号或密码不能为空！</div>';
        res.sendStatus(404);
    } else {
        const result = user_register(user.user_id, user.username, genPassword(user.password))
        return result.then(registerData => {
            if (registerData) {
                user_info_register(user.user_id)
                console.log('user_info成功')
                // req.session.isFirst = 1;
                // res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true });
                // set_redis(req.sessionId, req.session)
                console.log(user.user_id)
                var ret = {
                    "success": true,
                    "code": 20001,
                    "message": "成功",
                    "data": {
                        user_id:user.user_id
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
    }
});
// const handleUser_loginRouter = (req, res) => {
//     if (req.method === 'POST' && req.path === '/api/user/login') {
//         console.log('login req.body', req.body)
//         const { username, password } = req.body
//         const result = user_login(username, genPassword(password))
//         return result.then(loginData => {
//             if (loginData.user_id) {
//                 console.log('session loginData', loginData)
//                 // 登录成功，设置session
//                 req.session.user_id = loginData.user_id
//                 req.session.user_name = loginData.user_name
//                 set_redis(req.sessionId, req.session)
//                 return new SuccessModel({ session: req.session })
//             } else {
//                 return new ErrorModel('用户登录失败')
//             }
//         }).catch(err => {
//             return new ErrorModel('用户登录失败')
//         })
//     }
// }
// const handleUser_registerRouter = (req, res) => {
//     if (req.method === 'POST' && req.path === '/api/user/register') {
//         console.log('register req.body', req.body)
//         const { user_id, username, password } = req.body
//         const result = user_register(user_id, username, genPassword(password))
//         return result.then(registerData => {
//             if (registerData) {
//                 console.log('成功')
//                 req.session.user_id = user_id
//                 req.session.user_name = username
//                 set_redis(req.sessionId, req.session)
//                 return new SuccessModel({ session: req.session })
//             } else {
//                 return new ErrorModel('用户注册失败')
//             }
//         }).catch(err => {
//             return new ErrorModel('用户注册失败')
//         })
//     }
// }
module.exports = router



