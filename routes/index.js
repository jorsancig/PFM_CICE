
//ENDPOINT
const Express = require("express");
const router = Express.Router();


router.get("/", async (req, res) => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")

    res.send(data)
});


module.exports = router;





