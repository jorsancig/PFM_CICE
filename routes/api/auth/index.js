const Express = require("express");
const router = Express.Router();



router.use( '/signup', require( './signup' ) )
router.use( '/login', require( './login' ) )
router.use( '/logout', require( './logout' ) )
router.use( '/useracces', require( './userAccess' ) )
router.use( '/update', require( './update' ) )




module.exports = router