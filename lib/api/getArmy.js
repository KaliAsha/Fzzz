/**
 * Fzzz - getArmy
 */

function getArmy () {
    const URL = 'Armee.php'
    return this._requester.get(URL).then(($) => {
        const unitsNames = [
            'Jeune Soldate Naine',
            'Soldate Naine',
            'Naine d’Elite',
            'Jeune Soldate',
            'Soldate',
            'Concierge',
            'Artilleuse',
            'Artilleuse d’élite',
            'Soldate d’élite',
            'Tank',
            'Tueuse',
            'Tueuse d’élite'
        ]
        const armyData = {}
        $('table.simulateur tr').each((i, el) => {
            if (i >= 2 && i <= 13) { // First two lines are used for titles
                const armyA = $(el).children('td').map((j, elem) => {
                    if (j >= 1) {
                        return $(elem).text()
                    }
                }).get()
                armyO = {tdc: 0, dome: 0, loge: 0}
                for (let i = 0; i < armyA.length; i++) {
                    const army = Number(armyA[i].replace(' ', ''))
                    if (army > 0) {
                        if (i === 1) {
                            armyO.tdc = army
                        } else if (i === armyA.length - 2) {
                            armyO.loge = army
                        } else {
                            armyO.dome = army
                        }
                    }
                }
                armyData[unitsNames[i-2]] = armyO
            }
        })
        return armyData
    })
}

module.exports = getArmy