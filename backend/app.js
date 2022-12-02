const queryString = require('querystring')
const handleUserRouter = require('./src/router/user')
const { set_redis, get_redis } = require('./src/db/redis')
const { access_log } = require('./src/utils/log')
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => postData += chunk.toString())
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
        // console.log()
    })
}

const SESSION_DATA = {}

const severHandle = (req, res) => {
    console.log('进入serverHandle',SESSION_DATA)
    // 记录 access log
    access_log(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = queryString.parse(url.split('?')[1])
    // console.log( req )
    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
        // console.log( )
    })
    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userId
    console.log("req.cookie",req.cookie)
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set_redis(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    get_redis(req.sessionId).then(sessionData => {
        console.log("sessionData",sessionData)
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set_redis(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // 处理 post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        // 处理路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(u => {
                if (needSetCookie) {
                    console.log(userData)
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(u))
            })
            return
        }
    })
}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toGMTString()
}


module.exports = severHandle
