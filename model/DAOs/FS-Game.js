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
            throw new Error(`No se logro leer la ruta ${this.logicGame}`);
        }
        return escenes;

    }

    getEscene = async (cards) => {
        try {
            const escenes = await this.readFile();
            if (cards) {
                const esceneFound = escenes.find(escene => escene.cards === cards);
                return esceneFound || {};
            }
        } catch {
            throw new Error(`No se logro traer la logica del juego de la ruta ${this.logicGame}`);
        }
    }

}

export default Model_GameFS;
