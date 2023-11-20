import model from '../model/modelFactory.js';
import NodeMailer from './Notifications/Nodemailer.js';


class Service_Users {
    constructor(persistencia) {
        this.model = model.get('USER',persistencia);
        this.nodeMailer = new NodeMailer();
    }

    getUser = async (uname, pass) => {
        try {
            let user = {};
            if (uname !== undefined) {
                user = await this.model.getUser(uname);
                if (Object.keys(user).length) {
                    if (pass && user.pass == pass) {
                    await this.nodeMailer.sendMail(user.uname, "login");
                    } else {
                        user = { "msg": "Password incorrecto" }
                    }
                } else {
                    user = { "msg": "Usuario no se encontro" }
                }
            } else {
                user = { "msg": "Usuario no se encontro" }
            }
            return user;
        } catch (error) {
            throw (error)
        }
    }


    modifyUser = async (id, user) => {
        try {
            const userMod = await this.model.modifyUser(id, user);
            return userMod;
        } catch (error) {
            throw (error)
        }
    }

    createUser = async (user) => {
        try {
            const userCreated = await this.model.createUser(user);
            if (Object.keys(userCreated).length && !userCreated.msg) {
            await this.nodeMailer.sendMail(user.uname, "create");
            }
            return userCreated;
        } catch (error) {
            throw (error)
        }
    }

    removeUser = async (id) => {
        try {
            const userRemoved = await this.model.removeUser(id);
            return userRemoved;
        } catch (error) {
            throw (error)
        }
    }
}

export default Service_Users;
