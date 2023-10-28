import model from '../model/ItemFS.js';

class Service_Items {
    constructor() {
        this.model = new model();
    }

    getEscene = async (id) => {
        let item = {};        
        if (id !== undefined) {
            item = await this.model.getEscene(id);
        }
        return item;
    }
}

export default Service_Items;
