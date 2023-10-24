import model from '../model/GameFS.js';

class Service_Game {
    constructor() {
        this.model = new model();
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
