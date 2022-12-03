const { user_check } = require("../controller/user");

router.post('/api/user/register', upload.array(), function (req, res, next) {
    var card = { card_num: req.body.card_num, user_id: req.body.user_id, password: req.body.password };
    var checked = req.body.checked;
    console.log(req.body)
    if (user.username == '' || user.password == '') {
        req.session.message = '<div style="position:fixed;top:0;color:red;width:100%;">账号或密码不能为空！</div>';
        res.sendStatus(404);
    } else {
        const result = user_check(user.user_id, genPassword(user.password))
        return result.then(checkrData => {
            if (checkData) {
                console.log('校验正确')
                const bound_res = card_boud(user.user_id, card_num)
                if (bound_res) {
                    var ret = {
                        "success": true,
                        "code": 20000,
                        "message": "成功",
                        "data": {

                        }
                    } 
                    res.send(ret)
                }
                else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            res.sendStatus(404);
        })
    }
});