const express = require("express");
const router = express.Router();

router.get( "/index", ( req, res ) => { 
    res.status(200).json( { message: "hola desde index router" } )
 } )

 module.exports = router;