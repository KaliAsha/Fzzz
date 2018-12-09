/**
 * Fzzz - Utils - Requester
 */

/* Dependencies */
const cheerio = require('cheerio')
const request = require('request-promise-native')

class Requester {
    /**
     * Create a Request client to call Fourmizzz website
     * @param {String} baseUrl URL of Fourmizzz website
     * @param {Functions} onError Function to call on request's error
     */
    constructor (baseUrl, onError) {

        this._baseUrl = baseUrl
        
        this._onError = onError

        this._cookieJar = request.jar()
        this._requestParams = {
            jar: this._cookieJar,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'
            },
            resolveWithFullResponse: true,
            followAllRedirects: true
        }
        this._rq = request.defaults(this._requestParams)
    
    } 

    /**
     * Send a GET request to specified path
     * @param {String} path Path of the request
     * @param {Boolean} raw Set to True if raw response is wanted instead of cheerio-parsed response (default to False)
     */
    get (path, raw = false) {
        const URL = this._baseUrl + path
        return this._rq(URL).catch(this._onError).then((res) => this._returnRes(res, raw))
    }

    /**
     * Send a POST request to specified path with specified form
     * @param {String} path Path of the request
     * @param {Object} form Form submited with POST request
     * @param {Boolean} withToken Set to True if the request needs a t = token entry (default to false)
     * @param {Boolean} raw Set to True if raw response is wanted instead of cheerio-parsed response (default to False)
     */
    async post (path, form, withToken = false, raw = false) {
        const URL = this._baseUrl + path
        if (withToken) {
            const token = await this._getToken(path)
            form.t = token
        }
        return this._rq.post(URL, { form }).catch(this._onError).then((res) => this._returnRes(res, raw))
        
    }

    async _getToken (path) {
        return this.get(path).then(($) => {
            const token = $('#t').val()
            return token
        })
    }

    _returnRes(res, raw) {
        if (raw) {
            return res
        } else {
            return cheerio.load(res.body)
        }
    }
}

module.exports = Requester