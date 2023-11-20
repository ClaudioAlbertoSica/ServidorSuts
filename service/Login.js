import model from '../model/modelFactory.js';

class Service_lOGIN {
    constructor() {
        this.model = model.get('USER');
    }

    authentication = async (Username, Password) => {
        const userFromModel = await this.model.getUser(Username)
        if (Object.keys(userFromModel).length && userFromModel.pass == Password && Password) {
            return true
        } else {
            return false
        }
    }
}
export default Service_lOGIN;


