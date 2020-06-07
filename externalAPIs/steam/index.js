const Express = require("express");
const router = Express.Router();



// router.use( '/signup', require( './signup' ) )
router.use( '/allgames', require( './getAllGames' ) )



module.exports = router