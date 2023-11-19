import model from '../model/modelFactory.js';

class Service_Game {
    constructor() {
        this.model = model.get('GAME');
    }

    getEscene = async (cards) => {
        let escene = {};        
        if (cards !== undefined) {
            escene = await this.model.getEscene(cards);
        }
        return escene;
    }
}

export default Service_Game;
