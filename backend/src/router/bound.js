// const handleboundRouter = (req, res) => {
//     if (req.method === 'POST' && req.path === '/api/bound/add') {
//         console.log('login req.body',req.body)
//         const { username, password } = req.body
//         const result = user_login(username, genPassword(password))
//         return result.then(loginData => {
//             if (loginData.user_id) {
//                 console.log('session loginData',loginData)
//                 // 登录成功，设置session
//                 req.session.user_id = loginData.user_id
//                 req.session.user_name = loginData.user_name
//                 set_redis(req.sessionId, req.session)
//                 return new SuccessModel({session: req.session})
//             } else {
//                 return new ErrorModel('用户登录失败')
//             }
//         }).catch(err => {
//             return new ErrorModel('用户登录失败')
//         })
//     }
//     else if (req.method === 'POST' && req.path === '/api/user/register') {
//         console.log('register req.body',req.body)
//         const { user_id,username, password } = req.body
//         const result = user_register(user_id,username, genPassword(password))
//         return result.then(registerData => {
//             if (registerData) {
//                 console.log('成功')
//                 req.session.user_id = user_id
//                 req.session.user_name = username
//                 set_redis(req.sessionId, req.session)
//                 return new SuccessModel({session: req.session})
//             } else {
//                 return new ErrorModel('用户注册失败')
//             }
//         }).catch(err => {
//             return new ErrorModel('用户注册失败')
//         })
//     }
// }