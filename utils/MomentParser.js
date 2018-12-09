/**
 * Fzzz - Utils - MomentParser
 */

class MomentParser {
    /**
     * Return a MomentJS' compatible object representation of given duration string
     * @param {String} str Fourmizzz's duration string to parse
     */
    static duration (str) {
        const m = /(?:(\d+)J )?(?:(\d+)H )?(?:(\d+)m )?(?:(\d+)s)?/.exec(str.trim())
        return {
            days: Number(m[1] || 0),
            hours: Number(m[2] || 0),
            minutes: Number(m[3] || 0),
            seconds: Number(m[4] || 0),
        }
    }
}

module.exports = MomentParser