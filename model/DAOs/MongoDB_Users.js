import CnxMongoDB from "../Connection/DBMongo.js";

class MongoDB_Users {


    getUser = async (name) => {

        if (!CnxMongoDB.connected) {
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        let msg = 'Usuario no encontrado' // mensaje a retornar, en caso de no encotrar usuario

        if (name) {
            const userFound = await CnxMongoDB.db.collection('users').findOne({ uname: name })
            //La validación del pass se debe realizar en el model o en el servicio?
            if (userFound) {
                return userFound;
            } else {
                return { msg };
            }
        }
        msg = 'El usuario no puede estar vacío'
        return { msg };
    }



    modifyUser = async (id, user) => {

        if (!CnxMongoDB.connected) {
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        const currentUser = await CnxMongoDB.db.collection('users').findOne({ id: id })

        let userMod;

        if (currentUser) {
            if (user.inventory) { //Previene error "user.inventory is not iterable". Previene que un ítem pise al siguiente, en el inventario.
                userMod = { ...currentUser, ...user, inventory: [...currentUser.inventory, ...user.inventory] };
            } else {
                userMod = { ...currentUser, ...user };
            }
            await CnxMongoDB.db.collection('users').replaceOne(
                { id: id }, //filter
                ({ ...userMod })
            )
            return await CnxMongoDB.db.collection('users').findOne({ id: userMod.id })
        } else {
            return {}
        }


    }


    createUser = async (user) => {

        if (!CnxMongoDB.connected) {
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        const exist = await CnxMongoDB.db.collection('users').findOne({ uname: user.name })
        const users = await CnxMongoDB.db.collection('users').find({}).toArray() // hacerlo con un count. Solo hace falta la cantidad para calcular el #ID

        if (!exist) {
            if (user.uname && user.pass) {
                user.id = String(parseInt(users[users.length - 1]?.id || 0) + 1);
                user.uname = String(user.uname);
                user.pass = String(user.pass);
                user.inventory = [];
                user.escene = 'E0';

                await CnxMongoDB.db.collection('users').insertOne({ ...user })

                return await CnxMongoDB.db.collection('users').findOne({ uname: user.uname })
            } else {
                console.log('falta datos');
            }
        } else {
            return { "msg": "Usuario existente, por favor inicie sesión" };
        }
    }


    removeUser = async (id) => {

        if (!CnxMongoDB.connected) {
            throw new Error(`Conexión con la Base de Datos no establecida`)
        }

        const userFound = await CnxMongoDB.db.collection('users').findOne({ id: id })

        if (!userFound) {
            await CnxMongoDB.db.collection('users').deleteOne({ userFound })
        }
        return userFound;
    }
}

export default MongoDB_Users;
