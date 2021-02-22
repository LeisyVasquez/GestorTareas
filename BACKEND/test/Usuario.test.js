const request = require('supertest');
const faker = require('faker');
const dateformat = require('dateformat');
const app = require('./../index');

describe("Pruebas para el modelo Usuario",()=>{
    it("Ver usuarios", async()=>{
        const res = await request(app)
            .get('/usuario')
    });
    it("Insertar usuario", async()=>{
        const res = await request(app)
            .post('/usuario')
            .send({ 
                    nombres: faker.name.firstName(), 
                    apellidos: faker.name.lastName(), 
                    correo: faker.internet.email(), 
                    contrasena: faker.internet.password()
                })
            expect(res.statusCode).toEqual(201)
    });
})