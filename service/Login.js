import model from '../model/modelFactory.js';

class Service_lOGIN {
    constructor() {
        this.model = model.get('USER');
    }

    authentication = async (Username, Password) => {
        const userFromModel = await this.model.getUser(Username)
        if (userFromModel && userFromModel.pass == Password) {
            return true
        } else {
            return false
        }
    }
}
export default Service_lOGIN;


