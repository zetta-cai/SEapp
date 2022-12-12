const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
const { history_show } = require('../controller/history');
var router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/', upload.array(), function (req, res, next) {
    var decoded = jwt.decode(req.body.uid);
    console.log(decoded);
    var user = { uid: decoded.uid };
    const result = history_show(user.uid)

    return result.then(Data => {
        var str1 = ""
        for (i in Data) {
            // console.log(Data[i].transactions_type)
            str1 = str1
                + '种类:' + Data[i].transactions_type + ' '
                + '我方:' + Data[i].my_id + ' '
                + '卡号:' + Data[i].my_card_num + ' '
                + '对方:' + Data[i].the_other_card_num + ' '
                + '卡号:' + Data[i].transactions_money + ' '
                + '时间:' + Data[i].transactions_time + ' '
                + '\n'
        }
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
    }).catch(err => {
        res.sendStatus(404);
    });
})
module.exports = router