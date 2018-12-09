/**
 * Fzzz - datas - displayDatas
 */

/* Depencencies */
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, process.argv[2] + '.json'), 'utf8', (err, data) => {
    if (err) console.error(err)
    console.log(require('util').inspect(JSON.parse(data), {colors: 1}))
})