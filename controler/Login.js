import service from '../service/Login.js'

class Controler_Login {
    constructor() {
        this.service = new service();
    }

    validarLogin = async (req, res, next) => {
        let isUserLogedIn = req.session.loggedIn
        if (req.session.loggedIn) {
            return next()
        } else if (!req.session.loggedIn) {
            const { Username, Password } = req.body
            req.session.loggedIn = await this.service.authentication(Username, Password)
            if (req.session.loggedIn) {
                return next()
            }
        }
        res.status(500).send('Ingreso no autorizado')
    }

    logout = (req, res) => {
        req.session.destroy()
        res.send()
    }
}

export default Controler_Login;
