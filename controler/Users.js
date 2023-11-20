import service from '../service/Users.js'

class Controler_Users {
    constructor(persistencia) {
        this.service = new service(persistencia);
    }

    getUser = async (req,res) => {
        try {
            const {uname, pass} = req.body;
            const user = await this.service.getUser(uname, pass);
            res.json(user);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }

    modifyUser = async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.body;
            const userMod = await this.service.modifyUser(id, user);
            res.json(userMod);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }

    createUser = async (req,res) => {
        try {
            const user = req.body;
            console.log(user)
            const userCreated = await this.service.createUser(user);
            console.log(res.status)
            res.json(userCreated);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }

    removeUser = async (req, res) => {
        try {
            const { id } = req.params;
            const userRemoved = await this.service.removeUser(id);
            res.json(userRemoved);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }
}

export default Controler_Users;
