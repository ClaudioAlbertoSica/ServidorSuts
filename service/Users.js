import model from '../model/UsersFS.js';
import NodeMailer from './Notifications/Nodemailer.js';


class Service_Users {
    constructor() {
        this.model = new model();
        this.nodeMailer = new NodeMailer();
    }

    getUser = async (uname, pass) => {
        let user = {};
        if (uname !== undefined) {
            user = await this.model.getUser(uname, pass);
            if (Object.keys(user).length && !user.msg) {
                await this.nodeMailer.sendMail(user.uname, "login");
            }
        }
        return user;
    }
    
    modifyUser = async (id, user) => {
        const userMod = await this.model.modifyUser(id, user);
        return userMod;
    }
    
    createUser = async (user) => {
        const userCreated = await this.model.createUser(user);
        if (Object.keys(userCreated).length && !userCreated.msg) {
            await this.nodeMailer.sendMail(user.uname, "create");
        }
        return userCreated;
    }
    
    removeUser = async (id) => {
        const userRemoved = await this.model.removeUser(id);
        return userRemoved;
    }
}

export default Service_Users;
