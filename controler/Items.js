import service from '../service/Items.js'

class Controler_Items {
    constructor() {
        this.service = new service();
    }

    obtenerEscena = async (req,res) => {
        const {id} = req.params;
        const item = await this.service.getEscene(id);
        res.json(item);
    }
}

export default Controler_Items;
