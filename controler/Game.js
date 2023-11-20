import service from '../service/Game.js'

class Controler_Game {
    constructor(persistencia) {
        this.service = new service(persistencia);
    }

    obtenerEscena = async (req,res) => {
        const {cards} = req.params;
        const escene = await this.service.getEscene(cards);
        res.json(escene);
    }
}

export default Controler_Game;
