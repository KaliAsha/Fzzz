/**
 * Fzzz - getResearch
 */

function getResearch () {
    const URL = 'laboratoire.php'
    return this._requester.get(URL).then(($) => {
        let research = {}
        const labData = /- (.+) terminé dans: (.+)  - Annuler/.exec($('[id^=rec]').parent().text())
        if (labData) {
            const cancelLink = $('[id^=rec]').siblings('a').attr('href')
            const researchData = /(.+) (\d*)/.exec(labData[1])
            research = {
                researching: researchData[1],
                level: Number(researchData[2]),
                time: this._utils.tools.MomentParser.duration(labData[2]),
                cancelLink: this._baseUrl + cancelLink
            }
            research.endDate = this._utils.modules.moment().add(research.time).format()
        }
        return research
    })
}

module.exports = getResearch