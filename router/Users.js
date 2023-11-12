import expres from 'express';
import controler from '../controler/Users.js'

class Router_Users {
    constructor() {
        this.router = expres.Router();
        this.controler = new controler();
    }

    start() {
        this.router.post('/', this.controler.getUser);
        this.router.put('/:id', this.controler.modifyUser);
        this.router.post('/create/', this.controler.createUser);
        this.router.delete('/:id', this.controler.removeUser);
        
        return this.router;
    }
}

export default Router_Users;
