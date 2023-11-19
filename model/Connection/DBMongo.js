import { MongoClient } from "mongodb"
import config from '../../config.js'

class CnxMongoDB {
    static client = null
    static connected = false
    static db = null
    
    static conectar = async () => {
        console.log("Estableciendo conexión con la Base de Datos...")
        CnxMongoDB.client = new MongoClient(config.MONGO_STRCNX)
        await CnxMongoDB.client.connect()
        console.log('Base de datos conectada exitosamente')


        CnxMongoDB.db = CnxMongoDB.client.db(config.MONGO_DATA_BASE)

        CnxMongoDB.connected = true
    }

    static desconectar = () => {
        
    }
}

export default CnxMongoDB