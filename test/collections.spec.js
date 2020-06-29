const request = require("supertest")
const app = require("../app")


describe("Server", ()=> {

    describe("Endpoints", ()=> {
        describe("Collections", ()=> {

            describe("Add", ()=>{

                it("Should returns error if user does not exist", async()=> {

                    const body = {
                                    userID: 'bademail@test.com',
                                    tittle: 'testTitle',
                                    appID: 'testAppID',
                                    url: 'testURL',
                                    image: 'testImageURL',
                                    collectionClass: 'LOVE_CLASS'
                                }
                    const response = await request(app).post('/api/collections/add')
                                    .send( body );

                    expect(response.status).toBe(409)

                })

                it("Should returns error for existing user's game", async()=> {

                    const body = {
                                    userID: 'test@test.com',
                                    tittle: 'testTitle',
                                    appID: 'testAppID',
                                    url: 'testURL',
                                    image: 'testImageURL',
                                    collectionClass: 'LOVE_CLASS'
                                }
                    const response = await request(app).post('/api/collections/add')
                                    .send( body );

                    expect(response.status).toBe(409)

                })

                it("Should add a game to user's collection", async()=> {

                    const body = {
                                    userID: 'test@test.com',
                                    tittle: 'testTitle',
                                    appID: 'testAppID',
                                    url: 'testURL',
                                    image: 'testImageURL',
                                    collectionClass: 'LOVE_CLASS'
                                }
                    const response = await request(app).post('/api/collections/add')
                                    .send( body );

                    expect(response.status).toBe(200)

                })
            
            })


            
        
        })
    })  
})