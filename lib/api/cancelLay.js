/**
 * Fzzz - cancelLay
 */

async function cancelLay () {
    
    const token = await getToken.call(this)
    const URL = this._baseUrl + 'Reine.php?AnnulerPonte&t=' + token
    return this._utils.modules.request(URL).catch(this._onError)
}

function getToken () {
    const URL = this._baseUrl + 'Reine.php'
    return this._utils.request(URL).catch(this._onError).then((res) => {
        const $ = this._utils.cheerio.load(res.body)
        const token = $('#t').val()
        return token
    })
}

module.exports = cancelLay