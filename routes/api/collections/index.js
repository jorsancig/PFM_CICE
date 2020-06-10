const Express = require("express");
const router = Express.Router();



router.use( '/add', require( './add' ) )
router.use( '/delete', require( './delete' ) )
router.use( '/edit', require( './update' ) )
router.use( '/collection', require( './getCollection' ) )
// router.use( '/login', require( './login' ) )
// router.use( '/logout', require( './logout' ) )
// router.use( '/useracces', require( './userAccess' ) )



module.exports = router