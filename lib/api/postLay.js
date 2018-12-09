/**
 * Fzzz - postLay
 */

/**
 * Lay an amount of an unit
 * @param {String} type ID of unit to lay
 * @param {Number} num Number of units to lay
 */
function postLay (type, num) {
    const URL = this._baseUrl + 'Reine.php'
    const unitTypes = {
        Ouv: 'ouvriere',
        JSN: 'unite1',
        SN: 'unite2',
        NE: 'unite3',
        JS: 'unite4',
        S: 'unite5',
        C: 'unite6',
        A: 'unite7',
        AE: 'unite8',
        SE: 'unite9',
        Tk: 'unite10',
        T: 'unite11',
        TE: 'unite12',
    }
    const form = {
        input_cout_nombre: num,
        nombre_de_ponte: num,
        destination: 3,
        typeUnite: unitTypes[type],
        unePonte: 'oui'
    }
    return this._requester.post(URL, form, true)
}

module.exports = postLay