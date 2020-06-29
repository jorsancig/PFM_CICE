const request = require("supertest")
const app = require("../app")


describe("Server", ()=> {

    describe("Endpoints", ()=> {
        describe("Users", ()=> {

            const users = require( '../routes/' )

            // // const {router} = require('router')

            const axios = {
                get: jest.fn().mockResolvedValue({ data: 1  }),         
                post: jest.fn().mockResolvedValue({ data: 1  })
            
            }
            // describe("Post", ()=>{

            //     it("Should return a json with the register user", async()=> {

            //         const res = {
            //             status: jest.fn().mockReturnThis(),
            //             json: jest.fn()
            //         }
                
            //         const body = {
            //             name		:	"userTesting",
            //             email		:	"testing@userbeta.com",
            //             password	:	"654321"
            //         }
            //         const response = await request(app).post("/api/auth/signup", body)
            //         await app({ router }).get({}, res)

            //         expect(response.statusCode).toEqual(200)
            //         // expect(response.body.length).not.toEqual(0)
            //     })
            
            // }),
            describe("Get", ()=>{

                it("Should get a list of users", async()=> {

                    const res = {
                        send: jest.fn()
                    }
        
                    await users.get( '/', ({}, res))
                
                    expect(res.send.mock.calls).toEqual([ [ 1 ] ])
        

                })
            
            })
        
        
        })
    })  
})