/**
 * Fzzz - postWorkersSet
 */

/**
 * Set the repartition of workers on TDC
 * @param {Number} food Quantity of workers to put on food
 * @param {Number} wood Quantity of workers to put on wood
 * @param {Boolean} all WIP
 */
function postWorkersSet (food, wood, all = false) {
    const URL = 'Ressources.php'
    const form = {
        ChangeRessource: 'Valider',
        RecolteNourriture: food,
        RecolteMateriaux: wood
    }
    return this._requester.post(URL, form)
}

module.exports = postWorkersSet