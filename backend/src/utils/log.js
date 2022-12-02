const fs = require('fs')
const path = require('path')

// 写日志
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}
// 生成write stream
const createWriteStream = (fileName) => {
	// 日志的输出目录
    const fullFileName = path.join(__dirname, '../../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'     // 追加写入， 覆盖用 ‘w’
    })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
const access_log = log => {
    writeLog(accessWriteStream, log)
}

// 写xx日志
// ......

module.exports = {
    access_log
}
