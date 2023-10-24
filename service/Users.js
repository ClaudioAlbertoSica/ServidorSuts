import model from '../model/UsersFS.js';

class Service_Users {
    constructor() {
        this.model = new model();
    }

    getUser = async (id) => {
        let user = {};        
        if (id !== undefined) {
            user = await this.model.getUser(id);
        }
        return user;
    }
    
    modifyUser = async (id, user) => {
        const userMod = await this.model.modifyUser(id, user);
        return userMod;
    }
    
    createUser = async (user) => {
        const userCreated = await this.model.createUser(user);
        return userCreated;
    }
    
    removeUser = async (id) => {
        const userRemoved = await this.model.removeUser(id);
        return userRemoved;
    }
}

export default Service_Users;
