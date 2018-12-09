/**
 * getBuildLevels
 */

/* Dependencies */
const fs = require('fs')
const path = require('path')
const MomentParser = require('../../utils/MomentParser')

const fileList = fs.readdirSync(path.join(__dirname))

const buildDatas = {}

for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (file === 'getBuildLevels.js') continue
    const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

    const rgx = /(.+)\n([\d ]+)\n([\d ]+)?/g
        let m
        const lvlList = []
        while ((m = rgx.exec(data)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === rgx.lastIndex) {
                rgx.lastIndex++
            }
            
            // The result can be accessed through the `m`-variable.
            const lvl = {
                time: MomentParser.duration(m[1]),
                cost: Number(m[2].replace(/ /g, '')),
                extra: m[3] ? Number(m[3].replace(/ /g, '')) : null
            }
            lvlList.push(lvl)
        }
        buildDatas[file] = lvlList
}

// console.log(buildDatas)

fs.writeFileSync(path.resolve(__dirname, '../', 'builds.json'), JSON.stringify(buildDatas))