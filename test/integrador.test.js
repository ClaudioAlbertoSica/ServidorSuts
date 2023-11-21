import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/users.js'
import Server from "../server.js"
import Config from '../config.js'


const testUser = generador.getLoginUser()

describe('test suts - user Cration', () => {
    describe('POST', () => {

        let userGuardado = {}

        it('debería generar un usuario nuevo, en la base de datos (con el mail y la contraseña provisto)', async () => {
            const server = new Server(8081, Config.MODEL_PERSISTANCE)
            const app = await server.start()

            const request = supertest(app)



            const response = await request.post('/api/users/create/').send(testUser)

            expect(response.status).to.eql(200)

            userGuardado = response.body

            expect(userGuardado.uname).to.eql(testUser.uname)
            expect(userGuardado.pass).to.eql(testUser.pass)

            await server.stop()
        })


        it('El usuario devuelto, debería contar con todas las propiedades esperadas', async () => {
            if(Config.MODEL_PERSISTANCE == 'MONGO'){
                expect(userGuardado).to.include.keys('_id', 'uname', 'pass', 'id', 'inventory', 'escene')
            }else{
                expect(userGuardado).to.include.keys('uname', 'pass', 'id', 'inventory', 'escene')             
            }


        })

        it('Al intentar crear un usuario que ya existe en la BD: devuelve mensaje indicando acerca de la situación', async () => {
            const server = new Server(8081, Config.MODEL_PERSISTANCE)
            const app = await server.start()

            const request = supertest(app)

            const response = await request.post('/api/users/create/').send(testUser)

            expect(response.status).to.eql(200)

            const mensajeRecibido = response.body

            expect(mensajeRecibido).to.include.keys('msg')
            expect(mensajeRecibido.msg).to.eql("Usuario existente, por favor inicie sesión")

            await server.stop()
        })
    })
})





describe('test suts - user Login', () => {
    describe('POST', () => {

        let userRecuperado = {}

        it('Si el usuario existe, lo devuelve y el status es 200', async () => {
            const server = new Server(8081, Config.MODEL_PERSISTANCE)
            const app = await server.start()

            const request = supertest(app)

            const response = await request.post('/api/users/').send(testUser)

            expect(response.status).to.eql(200)

            userRecuperado = response.body

            expect(userRecuperado.uname).to.eql(testUser.uname)
            expect(userRecuperado.pass).to.eql(testUser.pass)

            await server.stop()
        })

        it('El usuario devuelto, debería contar con todas las propiedades esperadas', async () => {
            if(Config.MODEL_PERSISTANCE == 'MONGO'){
                expect(userRecuperado).to.include.keys('_id', 'uname', 'pass', 'id', 'inventory', 'escene')
            }else{
                expect(userRecuperado).to.include.keys('uname', 'pass', 'id', 'inventory', 'escene')             
            }
        })

        it('Si se hace un loggin a un user que no está registrado: el sistema da aviso', async () => {
            const server = new Server(8081, Config.MODEL_PERSISTANCE)
            const app = await server.start()

            const request = supertest(app)

            const usuarioNoRegistrado = generador.getLoginUser()

            const response = await request.post('/api/users/').send(usuarioNoRegistrado)

            expect(response.status).to.eql(200)

            const mensajeRecibido = response.body

            expect(mensajeRecibido).to.include.keys('msg')
            expect(mensajeRecibido.msg).to.eql("Usuario no se encontro")

            await server.stop()
        })

    })
})

