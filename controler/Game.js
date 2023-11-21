import service from '../service/Game.js'

class Controler_Game {
    constructor(persistencia) {
        this.service = new service(persistencia);
    }

    obtenerEscena = async (req,res) => {
        try {
            const {cards} = req.params;
            const escene = await this.service.getEscene(cards);
            res.json(escene);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }
}

export default Controler_Game;
