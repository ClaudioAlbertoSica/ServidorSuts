import { faker } from '@faker-js/faker/locale/en'

const getFullUSer = _ => ({
    uname: "testMail@yahoo.com",
    pass: faker.internet.userName(),
    id: faker.number.int({ min: 0, max: 900 }),
    inventory: [],
    escene: faker.string.binary({ prefix: 'E' })
})

const getLoginUser = _ => ({
    uname: faker.internet.email(faker.internet.userName()),
    pass: faker.internet.userName()
})

//console.log(get())

export default {
    getFullUSer,
    getLoginUser
}