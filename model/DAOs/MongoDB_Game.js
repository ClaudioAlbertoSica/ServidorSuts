import CnxMongoDB from "../Connection/DBMongo.js";

class MongoDB_Game{

    getEscene = async (cards) => {
        try {
            if (cards) {
                const esceneFound = await CnxMongoDB.db.collection('logicGame').findOne({cards: cards});
                return esceneFound || {}
            } 
        } catch {
            throw new Error(`Conexión con la Base de Datos no establecida en getEscene`);
        }
    }
}

export default MongoDB_Game;
