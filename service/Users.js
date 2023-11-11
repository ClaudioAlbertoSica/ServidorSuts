import model from '../model/UsersFS.js';
import NodeMailer from './Notifications/Nodemailer.js';
import fs from 'fs'
class Service_Users {
    constructor() {
        this.model = new model();
        this.nodeMailer = new NodeMailer();

    }

    readNodeMailerFile = async () => {
        let nodeMsg = [];
        try {
            const read = await fs.promises.readFile('MsgNodeMailer.json', 'utf-8');
            nodeMsg = JSON.parse(read);
        } catch {
            console.log('error al leer');
        }
        console.log(nodeMsg)
        return nodeMsg;
    }

    getUser = async (id) => {
        let user = {};        
        if (id !== undefined) {
            user = await this.model.getUser(id);
            if (Object.keys(user).length) {
                let msgFile = await this.readNodeMailerFile();
                let loginMsg = msgFile.find(msg => msg.type === "login");
                await this.nodeMailer.sendMail(user.uname, loginMsg.subject, loginMsg.msg);
            }
        }
        return user;
    }
    
    modifyUser = async (id, user) => {
        const userMod = await this.model.modifyUser(id, user);
/*         if (Object.keys(userMod).length) {
            let msgFile = await this.readNodeMailerFile();
            let itemMsg = msgFile.find(msg => msg.type === "item");
            await this.nodeMailer.sendMail(user.uname, itemMsg.subject, itemMsg.msg);
        } */
        return userMod;
    }
    
    createUser = async (user) => {
        const userCreated = await this.model.createUser(user);
        if (Object.keys(userCreated).length) {
            console.log(this.nodeMailerFile)
            let msgFile = await this.readNodeMailerFile();
            let createMsg = msgFile.find(msg => msg.type === "create");
            await this.nodeMailer.sendMail(user.uname, createMsg.subject, createMsg.msg);
        }
        return userCreated;
    }
    
    removeUser = async (id) => {
        const userRemoved = await this.model.removeUser(id);
        return userRemoved;
    }
}

export default Service_Users;
