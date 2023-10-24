import fs from 'fs';

class Model_GameFS {
    constructor() {
        this.logicGame = 'logicGame.json';
    }

    readFile = async () => {
        let escenes = [];
        try {
            const read = await fs.promises.readFile(this.logicGame, 'utf-8');
            escenes = JSON.parse(read);
        } catch {
            console.log('error al leer');
        }
        return escenes;

    }

    getEscene = async (cards) => {
        const escenes = await this.readFile();
        if (cards) {
            const esceneFound = escenes.find(escene => escene.cards === cards);
            return esceneFound || {};
        } 
    }

}

export default Model_GameFS;
