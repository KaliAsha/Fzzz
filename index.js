/**
 * Fourmizzz API Client
 */

/* Dependencies */
const Requester = require('./utils/Requester')
const cheerio = require('cheerio')
const moment = require('moment')
const request = require('request-promise-native')

class Fzzz {
    constructor (serverId, options = {}) {

        // Public
        this.serverId = serverId
        this.user = {}

        // Private
        this._baseUrl = `http://${serverId}.fourmizzz.fr/`
        this._requester = new Requester(this._baseUrl, this._onError)

        // Modules
        this._utils = {}
        this._utils.tools = {
            MomentParser: require('./utils/MomentParser')
        }
        this._utils.modules = {
            cheerio: cheerio,
            moment: moment,
            request: request
        }
    }

    _onError (err) {
        console.error('ERROR : ' + err.toString())
        process.exit(1)
    }

    /**
     * Login to account with specified credentials
     * @param {String} username 
     * @param {String} password 
     */
    async login (username, password) {
        return await require('./lib/api/login').call(this, username, password)
            .then((userData) => {
                console.log(userData[1] + ' logged in on ' + userData[0])
                return userData
            })
    }

    /* ===== GET ===== */

    async getRessources () {
        return await require('./lib/api/getRessources').call(this)
            .then((ressourcesData) => {
                // console.log(ressourcesData)
                return ressourcesData
            })
    }

    async getLays (last = false) {
        return await require('./lib/api/getLays').call(this, last)
            .then((laysData) => {
                // console.log(laysData)
                return laysData
            })
    }

    async getArmy () {
        return await require('./lib/api/getArmy').call(this)
            .then((armyData) => {
                // console.log(armyData)
                return armyData
            })
    }

    async getBuilds () {
        return await require('./lib/api/getBuilds').call(this)
            .then((buildData) => {
                // console.log(buildData)
                return buildData
            })
    }

    async getResearch () {
        return await require('./lib/api/getResearch').call(this)
            .then((researchData) => {
                // console.log(researchData)
                return researchData
            })
    }

    /* ===== POST ===== */

    /**
     * Lay an amount of an unit
     * @param {String} type ID of unit to lay
     * @param {Number} num Number of units to lay
     */
    async postLay (type, num) {
        return await require('./lib/api/postLay').call(this, type, num).then(() => this.getLays(true))
    }

    /**
     * Send a convoy to specified player
     * @param {String} dest Player of destination
     * @param {Number} food Number of food units to send
     * @param {Number} wood Number of wood units to send
     * @param {Number} workers WIP
     */
    async postConvoy (dest, food, wood) {
        return await require('./lib/api/postConvoy').call(this, dest, food, wood).then(console.log('OK'))
    }

    /**
     * Set the repartition of workers on TDC
     * @param {Number} food Quantity of workers to put on food
     * @param {Number} wood Quantity of workers to put on wood
     * @param {Boolean} all WIP
     */
    async postWorkersSet (food, wood) {
        return await require('./lib/api/postWorkersSet').call(this, food, wood).then(console.log('OK'))
    }

    /* ===== CANCEL ===== */

    async cancelLay () {
        return await require('./lib/api/cancelLay').call(this).then(() => this.getLays(false))   
    }

    /* ===== CALC =====*/

    /**
     * Returns the production of ressources after 'time'
     * @param {Object} time MomentJS' compatible duration representation
     */
    async calcProduction (time) {
        return await require('./lib/calcProduction').call(this, time)
    }
}

module.exports = Fzzz