const request = require("supertest");
const App = require('../app');
const { book, tokenId9999 } = require('../dummies');

describe('/books', function () {
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });


    describe('POST /books', function () {

        it('should send a object - (code: 201)', async function () {  
            const response = await request(App)
                .post('/books')
                .send({
                    title: book.title,
                    start_resolve: book.start_resolve,
                    tag: book.tag
                })
                .set("authorization", global.token)
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title", book.title);
            expect(response.body).toHaveProperty("tag", book.tag);
            expect(response.body).toHaveProperty("resolved");
            expect(response.body).toHaveProperty("link_resolved");
            expect(response.body).toHaveProperty("level");
            expect(response.body).toHaveProperty("start_resolve");
            expect(response.body).toHaveProperty("done_resolved");
            expect(response.body).toHaveProperty("status", "doing");
            expect(response.body).toHaveProperty("UserId", global.userId);
            global.book1 = response.body
            global.bookId = response.body.id
        })

        it('should send errors - (Empty header authorization, code 400)', async function () {  
            const data = {}
            const errors = ["header authorization is required"]
            const response = await request(App)
                .get('/books')
                .send(data)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })        

        it('should send errors - (Empty body, code: 400) ', async function () {
            const data = {}
            const errors = ["Title is required", "Start resolve is required", "Tag is required"]
            const response = await request(App)
                .post('/books')
                .send(data)
                .set("authorization", global.token)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })

    })
    describe('GET /books', function () {

        it('should send arrays - (code: 200) ', async function () {
            const response = await request(App)
                .get('/books')
                .set('authorization', global.token)

            expect(response.status).toBe(200)    
            expect(response.body[0]).toHaveProperty("id", global.bookId);
            expect(response.body[0]).toHaveProperty("title", book.title);
            expect(response.body[0]).toHaveProperty("tag", book.tag);
            expect(response.body[0]).toHaveProperty("resolved");
            expect(response.body[0]).toHaveProperty("link_resolved");
            expect(response.body[0]).toHaveProperty("level");
            expect(response.body[0]).toHaveProperty("start_resolve");
            expect(response.body[0]).toHaveProperty("done_resolved");
            expect(response.body[0]).toHaveProperty("status", "doing");
            expect(response.body[0]).toHaveProperty("UserId", global.userId);
        })

        it('should send errors - (Empty header authorization, code 400)', async function () {  
            const errors = ["header authorization is required"]
            const response = await request(App)
                .get('/books')

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })

    })

    describe('GET /books/:id', function () {
        it('should send an object - (code: 200) ', async function () {
            const response = await request(App)
                .get('/books/' + global.bookId)
                .set('authorization', global.token)

            expect(response.status).toBe(200)    
            expect(response.body).toHaveProperty("id", global.bookId);
            expect(response.body).toHaveProperty("title", book.title);
            expect(response.body).toHaveProperty("tag", book.tag);
            expect(response.body).toHaveProperty("resolved");
            expect(response.body).toHaveProperty("link_resolved");
            expect(response.body).toHaveProperty("level");
            expect(response.body).toHaveProperty("start_resolve");
            expect(response.body).toHaveProperty("done_resolved");
            expect(response.body).toHaveProperty("status", "doing");
            expect(response.body).toHaveProperty("UserId", global.userId);
        })

        it('should send errors - (Empty header authorization, code 400)', async function () {  
            const errors = ["header authorization is required"]
            const response = await request(App)
                .get('/books/' + global.bookId)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
        it('should send errors - (authentication, code 400)', async function () {  

            const errors = ["access forbidden"]
            const { body } = await request(App)
                .post('/auth/register')
                .send({
                    name: "bayu kisoma",
                    email: "kisoma@iam.com",
                    password: "rahasia"
                })
            global.token2 = body.token
            const response = await request(App)
                .get('/books/'+ global.bookId )
                .set('authorization', global.token2)
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
    })
    
    describe('PUT /books/:id', function () {
        it('should send an object - (code: 200)', async function () {
            const response = await request(App)
                .put('/books/' + global.bookId)
                .send(book)
                .set('authorization', global.token)

            expect(response.status).toBe(200)    
            expect(response.body).toHaveProperty("id", global.bookId);
            expect(response.body).toHaveProperty("title", book.title);
            expect(response.body).toHaveProperty("tag", book.tag);
            expect(response.body).toHaveProperty("resolved", book.resolved);
            expect(response.body).toHaveProperty("link_resolved", book.link_resolved);
            expect(response.body).toHaveProperty("level", book.level);
            expect(response.body).toHaveProperty("start_resolve");
            expect(response.body).toHaveProperty("done_resolved");
            expect(response.body).toHaveProperty("status", book.status);
            expect(response.body).toHaveProperty("UserId", global.userId);
        })
        it('should send errors - (Empty header authorization, code 400)', async function () {  
            const errors = ["header authorization is required"]
            const response = await request(App)
                .get('/books/' + global.bookId)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
        it('should send errors - (authentication, code 400)', async function () {  

            const errors = ["access forbidden"]
            const response = await request(App)
                .get('/books/'+ global.bookId )
                .set('authorization', global.token2)
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })
    })

    describe('DELETE /books/:id', function () {
        it('should send errors - (Empty header authorization, code 400)', async function () {  
            const errors = ["header authorization is required"]
            const response = await request(App)
                .get('/books/' + global.bookId)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })

        it('should send errors - (authentication, code 400)', async function () {  

            const errors = ["access forbidden"]
            const response = await request(App)
                .get('/books/'+ global.bookId )
                .set('authorization', global.token2)
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toEqual(expect.arrayContaining(errors))
        })

        it('should send an object, (code: 200)', async function () {  
            const response = await request(App)
                .delete('/books/' + global.bookId)
                .set('authorization', global.token)

            expect(response.status).toBe(200)    
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("deleted", true)
        })
    })
})