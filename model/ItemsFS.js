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
            console.log('error al leer');
        }
        return items;

    }

    getEscene = async (id) => {
        const items = await this.readFile();
        if (id) {
            const itemFound = items.find(item => item.id === id);
            return itemFound || {};
        } 
    }

}

export default Model_ItemsFS;
