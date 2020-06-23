const request = require('supertest');
const App = require('../app');

const { user } = require('../dummies');

describe('/auth', function () {
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

    describe('/auth/register', function () {
        it('should create a new user - (code: 201)', async function () {
            const response = await request(App)
                .post('/auth/register')
                .send(user)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name", user.name)
            expect(response.body).toHaveProperty("email", user.email)
            expect(response.body).toHaveProperty("token")
            expect(response.body).not.toHaveProperty("password")
        })

        it('should send errors - (Empty body, code: 400)', async function () {
            const data = {}
            const errors = ["Name is required", "Email is required", "Password is required"]
            const response = await request(App)
                .post('/auth/register')
                .send(data)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
    })

    describe('/auth/login', function () {
        it('should send a object - (code: 200)', async function () {
            const response = await request(App)
                .post('/auth/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name", user.name)
            expect(response.body).toHaveProperty("email", user.email)
            expect(response.body).toHaveProperty("token")
            expect(response.body).not.toHaveProperty("password")

            global.token = response.body.token
            global.userId = response.body.id
        })
        
        it('should send errors - (Empty body, code: 400)', async function () {
            const data = {}
            const errors = ["Email is required", "Password is required"]
            const response = await request(App)
                .post('/auth/login')
                .send(data)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })

        it('should send errors - (email / password incorrect, code: 400)', async function () {
            const data = {
                email: "ngawur@iam.com",
                password: "ngawur"
            }
            const response = await request(App)
                .post('/auth/login')
                .send(data)

            const errors = ["Email/Password incorrect"];
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
    })

})