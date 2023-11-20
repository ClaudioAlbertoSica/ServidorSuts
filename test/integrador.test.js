import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/users.js'
import Server from "../server.js"


describe('test suts - users', () =>{
    describe('POST', () => {
        it('debería generar un usuario nuevo, en la base de datos (con el mail y la contraseña provisto)', async () => {
            const server = new Server(8081,'MONGO')
            const app = await server.start() 

            const request = supertest(app)

            const newUser = generador.getLoginUser()
            console.log("nuevo --------------")
            console.log(newUser)
            const response = await request.post('/api/users/create/').send(newUser)

            expect(response.status).to.eql(200)

            const userGuardado = response.body

            console.log("guardado --------------")
            console.log(userGuardado)
            
            
      //      expect(userGuardado).to.include.keys('_id','uname','pass','id','inventory','escene')
            expect(userGuardado.uname).to.eql(newUser.name)
            expect(userGuardado.pass).to.eql(newUser.pass)
    /*        expect(userGuardado.id).to.eql(newUser.id)
            expect(userGuardado.inventory).to.eql(newUser.inventory)
            expect(userGuardado.escene).to.eql(newUser.escene)*/

            await server.stop()

        })
    })











})



