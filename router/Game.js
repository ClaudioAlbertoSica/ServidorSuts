import expres from 'express';
import controler from '../controler/Game.js';

class Router_Game {
    constructor() {
        this.router = expres.Router();
        this.controler = new controler();
    }

    start() {
        this.router.get('/escene/:cards?', this.controler.obtenerEscena);
        return this.router;
    }
}

export default Router_Game;
