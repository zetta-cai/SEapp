const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => console.log(err))

const set_redis = (key,val) => {
    // if(!key) return 
    console.log('key',key)
    console.log('val',val)
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

const get_redis = (key) => {
    // console.log('key')
    console.log('key',key)
    // if(!key) return 
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err){
                console.log(err)
                return
            }
            if(val === null){
                resolve(val)
                return
            }
            try {
                resolve(JSON.parse(val)) // 是JSON格式就转化一下
            } catch(ex) {
                resolve(val)  // 抛错证明不是JSON
            }
        })
    })
}

module.exports = {
    set_redis,
    get_redis
}
