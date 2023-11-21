import service from '../service/Items.js'

class Controler_Items {
    constructor(persistencia) {
        this.service = new service(persistencia);
    }

    getItem = async (req,res) => {
        try {
            const {id} = req.params;
            const item = await this.service.getItem(id);
            res.json(item);
        } catch (error){
            res.status(500).send(error.mesage)
        }
    }
}

export default Controler_Items;
