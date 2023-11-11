import expres from 'express';
import controler from '../controler/Items.js'

class Router_Items {
    constructor() {
        this.router = expres.Router();
        this.controler = new controler();
    }

    start() {
        this.router.get('/:id?', this.controler.getItem);
        return this.router;
    }
}

export default Router_Items;
