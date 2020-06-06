const express = require("express");
const router = express.Router();

router.post( '/', ( req, res ) => {

  const body = req.body;
  res.status( 400 ).json( { message: 'User cannot be created' } )



}  )

router.get("/home", (req, res) => {
  const data = {
    name: "Jorge",
    cities: ["Madrid", "Barcelona", "Murcia"]
  };

  res.status( 400 ).json( { message: 'User cannot be created' } )
});

router.get("/about", (req, res) => {
  const data = {
    adminRole: true
  };

  res.render("about", data);
});

module.exports = router;