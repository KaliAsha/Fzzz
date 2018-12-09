/**
 * Fzzz - getLays
 */

function getLays (last = false) {
    const URL = 'Reine.php'
    return this._requester.get(URL).then(($) => {
        const laysArray = []
        $('.tableau_leger tr').each((i, el) => {
            const layA = $(el).children('td').map((j, elem) => {
                return $(elem).text().trim()
            }).get()
            if (i > 0) { // First line is for titles 
                const unitsDatas = /([\d ]+) (\D+)/.exec(layA[0])
                const lay = {
                    units: {
                        nbr: Number(unitsDatas[1].replace(' ', '')),
                        type: unitsDatas[2]
                    },
                    location: layA[1].trim(),
                    time: this._utils.tools.MomentParser.duration(layA[2]),
                    totalTime: this._utils.tools.MomentParser.duration(layA[3]),
                }
                lay.endDate = this._utils.modules.moment().add(lay.totalTime).format()
                laysArray.push(lay)
            }
        })
        if (last) {
            return laysArray.pop()
        } else {
            return laysArray
        }
    })
        
}

module.exports = getLays