const crypto = require('crypto') // nodejs自身提供的加密的库
// 自己随便定义一个密钥
const SECRET_KEY = 'cjztcl'

const md5 = (content) => {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // 把输出变成16进制
}

const genPassword = (password) => {
    // 可以自己随便定义一个把密钥包含进去的密码规则，然后再由md5进行加密
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
module.exports = { genPassword }
