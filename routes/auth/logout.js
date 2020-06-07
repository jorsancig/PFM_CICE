
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const isLoggedIn = require( '../../middlewares/isLoggedIn.js' )





router.get( '/', ( req, res ) => {

    req.session.destroy()

    res.status( 200 ).json( { message: 'Logout.' } )
} )








module.exports = router