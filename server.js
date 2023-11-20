import cors from 'cors';
import express, { Router } from "express";
import RouterUsers from './router/Users.js';
import RouterGame from './router/Game.js'
import RouterItems from './router/Items.js';
//import config from './config.js'
import CnxMongoDB from './model/Connection/DBMongo.js'

class Server {

    constructor(port, modeloPersistencia) {
        this.port = port
        this.persistencia = modeloPersistencia

        this.app = express()
        this.server = null
    }

    async start() {

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); //preguntar bien

        this.app.use(cors());
        this.app.use('/api/users', new RouterUsers(this.persistencia).start());
        this.app.use('/api/game', new RouterGame(this.persistencia).start());
        this.app.use('/api/items', new RouterItems(this.persistencia).start());

        // Solo si la persistencia configurada es MONGO
        if (this.persistencia == 'MONGO') {
            await CnxMongoDB.conectar()
        }

        const PORT = this.port;
        this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`));
        this.server.on('error', error => console.log(`Error en servidor: ${error.message}`));

        return this.app
    }

    async stop(){
        if(this.server) {
            this.server.close()
            await CnxMongoDB.desconectar()
            this.server = null
        }
    }
}

export default Server


