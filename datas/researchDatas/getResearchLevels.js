/**
 * getBuildLevels
 */

/* Dependencies */
const fs = require('fs')
const path = require('path')
const MomentParser = require('../../utils/MomentParser')

const fileList = fs.readdirSync(path.join(__dirname))

const researchDatas = {}

for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    if (file === 'getResearchLevels.js') continue
    const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

    const rgx = /(.+)\n([\d ]+)\n([\d ]+)\n([\d ]+)?/g
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
            }
            if (m[4]) {
                lvl.workers = Number(m[2].replace(/ /g, ''))
                lvl.food = Number(m[3].replace(/ /g, ''))
                lvl.wood = Number(m[4].replace(/ /g, ''))
            } else {
                lvl.food = Number(m[2].replace(/ /g, ''))
                lvl.wood = Number(m[3].replace(/ /g, ''))
            }
            lvlList.push(lvl)
        }
        researchDatas[file] = lvlList
}

// console.log(researchDatas)

fs.writeFileSync(path.resolve(__dirname, '../', 'researches.json'), JSON.stringify(researchDatas))