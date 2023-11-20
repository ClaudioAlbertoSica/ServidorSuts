import expres from 'express';
import controler from '../controler/Login.js'

class Router_Login {
    constructor() {
        this.router = expres.Router();
        this.controler = new controler();
    }

    start() {
        this.router.all('/*', this.controler.validarLogin)
        this.router.post('/logout', this.controler.logout)
        return this.router;
    }
}

export default Router_Login;
