import service from '../service/Users.js'

class Controler_Users {
    constructor() {
        this.service = new service();
    }

    getUser = async (req,res) => {
        const {uname, pass} = req.body;
        const user = await this.service.getUser(uname, pass);
        res.json(user);
    }

    modifyUser = async (req, res) => {
        const {id} = req.params;
        const user = req.body;
        const userMod = await this.service.modifyUser(id, user);
        res.json(userMod);
    }

    createUser = async (req,res) => {
        const user = req.body;
        const userCreated = await this.service.createUser(user);
        res.json(userCreated);
    }

    removeUser = async (req, res) => {
        const { id } = req.params;
        const userRemoved = await this.service.removeUser(id);
        res.json(userRemoved);
    }
}

export default Controler_Users;
