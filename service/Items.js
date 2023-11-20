import model from '../model/modelFactory.js';

class Service_Items {
    constructor(persistencia) {
        this.model = model.get(persistencia);
    }

    getItem = async (id) => {
        try{
        let item = {};        
        if (id !== undefined) {
            item = await this.model.getItem(id);
        }
        return item;
    } catch(error){
        throw(error)
    }
    }

}

export default Service_Items;
