const { user_check } = require("../controller/user");
const crypto = require('crypto')
var multer = require('multer');  //解析form的文本域与文件上传 
var upload = multer();
var express = require('express');
const { card_show, card_bound, card_show_money, card_check_user, card_check_card, update_money } = require("../controller/card");
var router = express.Router();
router.post('/deposit', upload.array(), function (req, res, next) {

})
router.post('/withdraw', upload.array(), function (req, res, next) {

})
module.exports = router