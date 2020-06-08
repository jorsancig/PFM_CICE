const Express = require("express");
const router = Express.Router();



router.use( '/allgames', require( './getAllGames' ) )
router.use( '/search', require( './search' ) )
router.use( '/info', require( './getGameInfo' ) )



module.exports = router