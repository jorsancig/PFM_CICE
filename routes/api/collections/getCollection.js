
const Express = require("express");
const router = Express.Router();
const Game = require("../../../models/Game");
const innerClasses = require( '../../../config/gameClass.json' )
const isLoggedIn = require( '../../../middlewares/isLoggedIn.js' )
const isOwner = require( '../../../middlewares/isOwner.js' )


router.get( '/:collectionClass', [isLoggedIn, isOwner], async( req, res ) => {

    const { collectionClass } = req.params;
    const { userID } = req.body

    if( !Object.values(innerClasses).includes( collectionClass ) ) return res.status( 400 ).json( { message: 'The collection value is not supported.' } )

    try {
        
        const wholeColection = await Game.find( { "userID": userID, "collectionClass": collectionClass } )

        if( wholeColection.length == 0 ) return res.status( 200 ).json( { message: "No games in this collection", collectionClass } )
        console.log( wholeColection )
        return res.status( 200 ).json( wholeColection );

    } catch (error) {

      console.log(error);
      res.status( 400 ).json(error);
    }



})


module.exports = router