/**
 * Fzzz - getBuilds
 */

function getBuilds () {
    const URL = 'construction.php'
    return this._requester.get(URL).then(($) => {
        let build = {}
        const buildData = /- (.+) se termine dans : (.+)  - Annuler/.exec($('[id^=bat]').parent().text())
        if (buildData) {
            const cancelLink = $('[id^=bat]').siblings('a').attr('href')
            const buildingData = /(.+) (\d*)/.exec(buildData[1])
            build = {
                building: buildingData[1],
                level: Number(buildingData[2]),
                time: this._utils.tools.MomentParser.duration(buildData[2]),
                cancelLink: this._baseUrl + cancelLink
            }
            build.endDate = this._utils.modules.moment().add(build.time).format()
        }
        return build
    })
}

module.exports = getBuilds