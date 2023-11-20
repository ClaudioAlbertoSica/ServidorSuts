import fs from 'fs';

class Model_ItemsFS {
    constructor() {
        this.itemsFile = 'items.json';
    }

    readFile = async () => {
        let items = [];
        try {
            const read = await fs.promises.readFile(this.itemsFile, 'utf-8');
            items = JSON.parse(read);
        } catch {
            throw new Error(`No se logro leer el archivo en la ruta ${this.userFile}`);
        }
        return items;

    }

    getItem = async (id) => {
        try {
            const items = await this.readFile();
            if (id) {
                const itemFound = items.find(item => item.id === id);
                return itemFound || {};
            }
        } catch {
            throw new Error(`No se logro traer el o los items en la ruta ${this.itemsFile}`);
        }
    }

}

export default Model_ItemsFS;
