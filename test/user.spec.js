const request = require("supertest")
const app = require("../app")


describe("Server", ()=> {

    describe("Endpoints", ()=> {
        describe("Users", ()=> {

            describe("Signup", ()=>{

                it("Should create a new user", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).post('/api/auth/signup')
                                    .send( body );

                    expect(response.status).toBe(200)

                })

                it("Should rturn error for existing user", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).post('/api/auth/signup')
                                    .send( body );

                    expect(response.status).toBe(409)

                })
            
            })

            describe("Login", ()=>{

                it("Should login user", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).post('/api/auth/login')
                                    .send( body );

                    expect(response.status).toBe(200)

                })

                it("Should return innexisten user error", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'bademail@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).post('/api/auth/login')
                                    .send( body );

                    expect(response.status).toBe(404)

                })

                it("Should return innexisten user error", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test@test.com',
                                    password: 'badpass'
                                }
                    const response = await request(app).post('/api/auth/login')
                                    .send( body );

                    expect(response.status).toBe(401)

                })
            
            })

            describe("Logout", ()=>{

                it("Should logout user", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).get('/api/auth/logout')

                    expect(response.status).toBe(200)

                })

            })

            describe("Logout", ()=>{

                it("Should if no logegd user returns error ", async()=> {

                    const body = {
                                    name: 'userTest',
                                    email: 'test2@test.com',
                                    password: 'testtest'
                                }
                    const response = await request(app).get('/api/auth/useracces')

                    expect(response.status).toBe(401)

                })

            })        
        
        })
    })  
})