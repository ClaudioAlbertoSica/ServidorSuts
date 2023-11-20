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
            throw new Error(`No se logro leer el archivo en la ruta ${this.userFile}`)
        }
        return users;
    }

    writeFile = async (user) => {
        try {
            await fs.promises.writeFile(this.userFile, JSON.stringify(user, null, '\t'));
        } catch {
            throw new Error (`No se logro escribir el archivo en la ruta ${this.userFile}`)
        }
    }

    getUser = async (name) => {
        try {
            const users = await this.readFile();
            const userFound = users.find(user => user.uname === name);
            return userFound || {};
        } catch {
            throw new Error(`No se logro traer el o los users en la ruta ${this.userFile}`);
        }
    }

    modifyUser = async (id, user) => {
        try {
            const users = await this.readFile();
            const index  = users.findIndex(user => user.id === id);
            if (index != -1) {
                const currentUser = users[index];
                let userMod;
                if (user.inventory) {
                    userMod = {...currentUser, ...user, inventory:[...currentUser.inventory, ...user.inventory]};
                } else {
                    userMod = {...currentUser, ...user};
                }
                users.splice(index, 1, userMod);
                await this.writeFile(users);
                return userMod;
            } else {
                return {};
            }
        } catch {
            throw new Error(`No se logro modificar el usuario que se deberia encontrar en la ruta ${this.userFile}`);
        }
    }

    createUser = async (user) => {
        try {
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
                return {"msg": "Usuario existente, por favor inicie sesión"};
            }
        } catch {
            throw new Error(`No se logro crear el usuario en ${this.userFile}`);
        }
    }

    removeUser = async (id) => {
        try {
            let user = {};
            const users = await this.readFile();
            const index = users.findIndex(user=> user.id === id);
            if (index != -1) {
                user = users.splice(index, 1);
                await this.writeFile(users);
            }
            return user;
        } catch {
            throw new Error(`No se logro remover el usuario del ${this.userFile}`);
        }
    }
}

export default Model_UserFS;
