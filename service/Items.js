import model from '../model/modelFactory.js';

class Service_Items {
    constructor() {
        this.model = model.get('ITEM');
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
