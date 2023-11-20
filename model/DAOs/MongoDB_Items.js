import CnxMongoDB from "../Connection/DBMongo.js";

class MongoDB_Items {
    getItem = async (id) => {
        try {
            if (id) {
                const itemFound = await CnxMongoDB.db.collection('items').findOne({ id: id })
                console.log(itemFound)
                return itemFound || {}
            }
        } catch {
            throw new Error(`Conexión con la Base de Datos no establecida en getItem`)
        }
    }
}


export default MongoDB_Items;
