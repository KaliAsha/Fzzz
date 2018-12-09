/**
 * Fzzz - calcProduction
 */

/**
 * Returns the production of ressources after 'time'
 * @param {Object} time MomentJS' compatible duration representation
 */
async function calcProduction (time = {days: 1}) {
    const workersData = await this.getRessources().then((resData) => resData.ressources.workers)
    const parsedTime = {
        days: time.days || 0,
        hours: time.hours || 0
    }
    const numOfSequences = parsedTime.days * 24 * 2 + parsedTime.hours * 2
    const finalRessources = {
        food: workersData.food * numOfSequences,
        wood: workersData.wood * numOfSequences
    }
    return finalRessources
}

module.exports = calcProduction