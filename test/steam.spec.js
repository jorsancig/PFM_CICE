const request = require("supertest")
const app = require("../app")


describe("Server", ()=> {

    describe("Endpoints", ()=> {
        describe("Steam", ()=> {

            describe("AllGames", ()=>{

                it("Should returns a list of steam games", async()=> {

                    const response = await request(app).get('/api/external/steam/allgames')

                    expect(response.status).toBe(200)
                    // expect(response.json).expect('Content-Type', /json/)


                })

            
            })


            describe("Search", ()=>{

                it("Should looking for Steam game", async()=> {

                    const response = await request(app).get('/api/external/steam/search/portal+2')

                    expect(response.status).toBe(200)
                    // expect(response.json).expect('Content-Type', /json/)


                })

            
            })


            
        
        })
    })  
})