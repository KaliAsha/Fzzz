/**
 * Fzzz - postConvoy
 */

/**
 * Send a convoy to specified player
 * @param {String} dest Player of destination
 * @param {Number} food Number of food units to send
 * @param {Number} wood Number of wood units to send
 * @param {Number} workers WIP
 */
function postConvoy (dest, food, wood, workers = false) {
    const URL = 'commerce.php'
    const form = {
        pseudo_convoi: dest,
        input_nbNourriture: food,
        nbNourriture: food,
        input_nbMateriaux: wood,
        nbMateriaux: wood,
        input_nbOuvriere: Math.ceil((food + wood) / 2),
        nbOuvriere: Math.ceil((food + wood) / 2),
        convoi:'Lancer+le+convoi',
    }
    return this._requester.post(URL, form, true)
}

module.exports = postConvoy