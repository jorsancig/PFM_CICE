const Express = require("express");
const router = Express.Router();



router.use( '/steam', require( './steam' ) )
router.use( '/search', require( './search' ) )
// router.use( '/logout', require( './logout' ) )
// router.use( '/useracces', require( './userAccess' ) )



module.exports = router