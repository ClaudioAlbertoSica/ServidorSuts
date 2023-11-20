import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/users.js'
import Server from "../server.js"


describe('test suts - user Cration', () => {
    describe('POST', () => {

        const newUser = generador.getLoginUser()

        let userGuardado = {}

        it('debería generar un usuario nuevo, en la base de datos (con el mail y la contraseña provisto)', async () => {
            const server = new Server(8081, 'MONGO')
            const app = await server.start()

            const request = supertest(app)



            const response = await request.post('/api/users/create/').send(newUser)

            expect(response.status).to.eql(200)

            userGuardado = response.body

            expect(userGuardado.uname).to.eql(newUser.uname)
            expect(userGuardado.pass).to.eql(newUser.pass)

            await server.stop()
        })

        it('El usuario devuelto, debería contar con todas las propiedades esperadas', async () => {
            expect(userGuardado).to.include.keys('_id', 'uname', 'pass', 'id', 'inventory', 'escene')

        })

        it('Al intentar crear un usuario que ya existe en la BD: devuelve mensaje indicando acerca de la situación', async () => {
            const server = new Server(8081, 'MONGO')
            const app = await server.start()

            const request = supertest(app)

            const response = await request.post('/api/users/create/').send(newUser)

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

    })
})

