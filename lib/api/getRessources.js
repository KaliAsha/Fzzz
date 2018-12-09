/**
 * Fzzz - getRessources
 */

function getRessources () {
    const URL = 'Ressources.php'
    return this._requester.get(URL).then(($) => {
        const ressourcesArray = $('#tableau_boite_info').text().replace(/\n+/g, '\n').trim().split('\n')
        const ressourcesDatas = {
            workers: {
                total: Number(ressourcesArray[0].replace(/ /g, '')),
                food: Number($('#RecolteNourriture').val().replace(/ /g, '')),
                wood: Number($('#RecolteMateriaux').val().replace(/ /g, ''))
            },
            food: Number(ressourcesArray[4].replace(/ /g, '')),
            wood: Number(ressourcesArray[5].replace(/ /g, '')),
            tdc: Number(ressourcesArray[6].replace(/ /g, ''))
        }
        const messagesDatas = {
            msg: Number(ressourcesArray[1]),
            fightReport: Number(ressourcesArray[2]),
            huntReport: Number(ressourcesArray[3])
        }
        return {ressources: ressourcesDatas, messages: messagesDatas}
    })        
}

module.exports = getRessources