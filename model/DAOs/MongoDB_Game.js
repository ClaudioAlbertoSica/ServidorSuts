import CnxMongoDB from "../Connection/DBMongo.js";

class MongoDB_Game{

    getEscene = async (cards) => {

        if (!CnxMongoDB.connected){
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        if (cards) {
            const esceneFound = await CnxMongoDB.db.collection('logicGame').findOne({cards: cards})
            return esceneFound || {}
        } 
    }




}

export default MongoDB_Game;
