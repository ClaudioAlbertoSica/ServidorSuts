import service from '../service/Login.js'

class Controler_Login {
    constructor() {
        this.service = new service();
    }

    validarLogin = async (req, res, next) => {
        let isUserLogedIn = req.session.loggedIn
        console.log(req.session.loggedIn)
        if (isUserLogedIn) {
            return next()
        } else if (!isUserLogedIn) {
            const { uname, pass } = req.body
            console.log(`el uname que llega es: ${uname}`)
            console.log(`el pass que llega es: ${pass}`)
            req.session.loggedIn = await this.service.authentication(uname, pass)
            if (req.session.loggedIn) {
                console.log("Usuario loggeado")
                return next()
            }
        }
        console.log("Usuario NO loggeado")
        res.status(500).send('Ingreso no autorizado')
    }

    logout = (req, res) => {
        console.log("Entró al logout" + req)
        req.session.destroy()
        res.send("Usuario Logged Out")
    }
}

export default Controler_Login;
