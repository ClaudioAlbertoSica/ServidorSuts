import nodemailer from 'nodemailer'
import Geolocalization from '../Geolocalization/obtainLocation.js'
import obtainIp from '../Geolocalization/obtainIp.js'
import fs from 'fs'

class NodeMailer {

    constructor(){
        this.geoLocalization = new Geolocalization()
        this.obtainIp = new obtainIp()
    }
    readNodeMailerFile = async () => {
        let nodeMsg = [];
        try {
            const read = await fs.promises.readFile('MsgNodeMailer.json', 'utf-8');
            nodeMsg = JSON.parse(read);
        } catch {
            console.log('error al leer');
        }
        //console.log(nodeMsg)
        return nodeMsg;
    }
    
    sendMail = async (destinatario, type) => {  

        const ipActual = await this.obtainIp.getUserIP();
        const geo = await this.geoLocalization.getGeolocation(ipActual)
        //console.log(geo.data)
        let msgFile = await this.readNodeMailerFile();
        let selectedMsg = await msgFile.find(msg => msg.type === type);
        /*console.log(selectedMsg)
        console.log(msgFile)*/
        const config =  {
        host : 'smtp.gmail.com',
        port : 587,
        secure: false,
        auth : {
            user : '2023juanmayordomo@gmail.com',
            pass : 'rtny tssw vcfv ftzs'
        },
        tls: {
            rejectUnauthorized: false //por problemas de certificado
        }
        }
        const mensaje = {
            from : 'Survive under the sun',
            to: destinatario,
            subject : selectedMsg.subject,
            text : `${selectedMsg.msg} Tu naufrago se encuentra en ${geo.data.city}`

        }

        const transporte = nodemailer.createTransport(config);

        /*const info = */await transporte.sendMail(mensaje);

        //console.log(info);
    }
}

export default NodeMailer;
