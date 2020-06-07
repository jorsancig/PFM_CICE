
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const isLoggedIn = require( '../../middlewares/isLoggedIn.js' )





router.get( '/', isLoggedIn,( req, res ) => {
    console.log(req.session)
    return res.status( 200 ).json( { message: "You're in!" } )

} )








module.exports = router