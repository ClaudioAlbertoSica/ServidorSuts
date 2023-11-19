import GameFS from './DAOs/FS-Game.js'
import ItemFS from './DAOs/FS-Items.js'
import UserFS from './DAOs/FS-Users.js'
import GameMonDB from './DAOs/MongoDB_Game.js'
import ItemMonDB from './DAOs/MongoDB_Items.js'
import UserMonDB from './DAOs/MongoDB_Users.js'
import config from '../config.js'

// Este es un Factory, para el Data Model <-- Piensoq eu podríamos armar un buen Abstract Factory a partir de esto
// la variabel "config" puede ser FILE o MONGO
class ModelSelector {
    static get(DAOrequerido) {
        const tipoDAO = DAOrequerido
        if (config.MODEL_PERSISTANCE == 'FILE') {

            switch (tipoDAO) {
                case 'GAME':
                    return new GameFS()

                case 'ITEM':
                    return new ItemFS()

                case 'USER':
                    return new UserFS()

            }
        } else if (config.MODEL_PERSISTANCE == 'MONGO') {

            switch (tipoDAO) {
                case 'GAME':
                    return new GameMonDB()

                case 'ITEM':
                    return new ItemMonDB()

                case 'USER':
                    return new UserMonDB()
            }
        }

    }

}

export default ModelSelector