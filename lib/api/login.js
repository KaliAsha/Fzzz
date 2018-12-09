/**
 * Fzzz - Login
 */

/**
 * Login to account with specified credentials
 * @param {String} username 
 * @param {String} password 
 */
function Login (username, password) {
    this.user = {username, password}
    const form = {
        connexion: 'Connexion',
        server: this._baseUrl.replace('http://', '').replace('/', ''),
        souvenir: 'on',
        pseudo: this.user.username,
        mot_passe: this.user.password
    }
    return this._requester.post('index.php?connexion=1', form).then(($) => {
        if ($('.boite_connexion_titre').length) {
            console.error('Error : username or password incorrect')
            process.exit(1)
        } else {
            const userData = $('.titre_ressource').text().split(' ')
            return userData
        }
    })
}

module.exports = Login