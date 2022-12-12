const fsLibrary = require('fs')
 
fsLibrary.readFile('./tmp.txt', (error, data) => {
    var array_txt=data.toString().split(' ')
    for (obj in array_txt) {
        console.log(array_txt[obj])
    }
    // In case of a error throw err exception. 
    if (error) throw err;
}) 
