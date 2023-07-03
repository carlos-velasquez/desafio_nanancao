const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('obteniendo un 200', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        expect(status).toBe(200);
    })

    it('obteniendo un cafe', async () => {
        const { body } = await request(server).get('/cafes/2').send();
        const cafe = body;
        expect(cafe).toBeInstanceOf(Object);
    })

    it('tenemos un array', async () => {
        const { body } = await request(server).get('/cafes').send();
        const cafe = body;
        console.log(cafe)
        expect(cafe).toBeInstanceOf(Array);
    })

    it('Se obtiene un código 404 al intentar eliminar un café con un id que no existe', async () => {
        const resultado = await request(server).delete('/cafes/5').send().auth(true)
        expect(resultado.statusCode).toBe(404)
    })

    it('Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201', async () => {
        const newCafe = {
            id: 5,
            nombre: 'Latte',
        }
        const resultado = await request(server).post('/cafes').send(newCafe)
        expect(resultado.statusCode).toBe(201)
    })

    it(' Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload', async () => {
        const newCafe = {
            id: 5
        }

        const resultado = await request(server).put('/cafes/4').send(newCafe)
        expect(resultado.statusCode).toBe(400)
    })

    it('enviando un nuevo cafe', async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: 'Cafe con Leche' };

        const { body: cafes } = await request(server)
            .post('/cafes')
            .send(cafe);
        console.log(cafes)
        expect(cafes).toContainEqual(cafe);
    });



});
