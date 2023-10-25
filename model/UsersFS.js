import fs from 'fs';

class Model_UserFS {
    constructor() {
        this.userFile = 'users.json';
    }

    readFile = async () => {
        let users = [];
        try {
            const read = await fs.promises.readFile(this.userFile, 'utf-8');
            users = JSON.parse(read);
        } catch {
            console.log('error al leer');
        }
        return users;

    }

    writeFile = async (user) => {
        try {
            await fs.promises.writeFile(this.userFile, JSON.stringify(user, null, '\t'));
        } catch {
            console.log('error al escribir');
        }
    }

    getUser = async (name) => {
        const users = await this.readFile();
        if (name) {
            const userFound = users.find(user => user.uname === name);
            return userFound || {};
        }
    }

    modifyUser = async (id, user) => {
        const users = await this.readFile();
        const index  = users.findIndex(user => user.id === id);
        if (index != -1) {
            const actualUser = users[index];
            const userMod = {...actualUser, ...user};
            users.splice(index, 1, userMod);
            await this.writeFile(users);
            return userMod;
        } else {
            return {};
        }
    }

    createUser = async (user) => {
        const users = await this.readFile();
        const exist = users.find(thisUser => thisUser.uname === user.uname)
        if (!exist) {
            if (user.uname && user.pass) {
                user.id = String(parseInt(users[users.length -1]?.id || 0) + 1);
                user.uname = String(user.uname);
                user.pass = String(user.pass);
                user.inventory = [];
                user.escene = 'E0';
                users.push(user);
                await this.writeFile(users)
                return user
            } else {
                console.log('falta datos');
            }
        } else {
            console.log('usuario ya existe');
        }
    }

    removeUser = async (id) => {
        let user = {};
        const users = await this.readFile();
        const index = users.findIndex(user=> user.id === id);
        if (index != -1) {
            user = users.splice(index, 1);
            await this.writeFile(users);
        }
        return user;
    }

}

export default Model_UserFS;
