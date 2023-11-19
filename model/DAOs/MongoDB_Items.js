import CnxMongoDB from "../Connection/DBMongo.js";

class MongoDB_Items {


    getItem = async (id) => {

        if (!CnxMongoDB.connected) {
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        if (id) {
            const esceneFound = await CnxMongoDB.db.collection('items').findOne({ id: id })
            return esceneFound || {}
        }
    }

}

export default MongoDB_Items;
