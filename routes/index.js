
//ENDPOINT
const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )


router.post("/", async (req, res) => {
    const { email } = req.body
    console.log( 'ENTRA EN GET' )
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
    console.log( 'SALE GET' )

    // res.send(data)
    res.status( 200 ).json( { message: email} )
});


module.exports = router;





