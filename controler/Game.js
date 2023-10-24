import service from '../service/Game.js'

class Controler_Game {
    constructor() {
        this.service = new service();
    }

    obtenerEscena = async (req,res) => {
        const {cards} = req.params;
        const escene = await this.service.getEscene(cards);
        res.json(escene);
    }
}

export default Controler_Game;
