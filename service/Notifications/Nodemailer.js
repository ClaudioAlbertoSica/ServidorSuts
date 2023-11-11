import nodemailer from 'nodemailer'

class NodeMailer {

    sendMail = async (destinatario, subject, msg) => {    
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
            subject : subject,
            text : msg
         }

        const transporte = nodemailer.createTransport(config);

        const info = await transporte.sendMail(mensaje);

        console.log(info);
    }
}

export default NodeMailer;
