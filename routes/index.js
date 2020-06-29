
//ENDPOINT
const Express = require("express");
const router = Express.Router();



const fool = (req, res) => {
    // const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")

    res.send(200)
}

router.get("/", fool( req, res ));


module.exports = router;





