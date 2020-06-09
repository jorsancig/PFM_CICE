
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const Game = require("../../models/Game");
const inner = require( '../../config/inner.json' )
const isLoggedIn = require( '../../middlewares/isLoggedIn.js' )
const isOwner = require( '../../middlewares/isOwner.js' )


router.delete( '/:appID', [isLoggedIn, isOwner], async( req, res ) => {

    const { appID } = req.params;
    const { userID } = req.body

    console.log( appID, userID )

    try {
        const deletedGame = await Game.deleteOne( { 'userID': userID, 'appID': appID } );

        if( deletedGame.deletedCount == 0 ) return res.status( 409 ).json( { message: "This game cannot be found in this user." } )

        return res.status( 200 ).json({ deletedGame });
    } catch (error) {

      console.log(error);
      res.status( 400 ).json(error);

    }



})


module.exports = router