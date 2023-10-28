import model from '../model/ItemsFS.js';

class Service_Items {
    constructor() {
        this.model = new model();
    }

    getItem = async (id) => {
        let item = {};        
        if (id !== undefined) {
            item = await this.model.getItem(id);
        }
        return item;
    }
}

export default Service_Items;
