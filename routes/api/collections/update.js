
const Express = require("express");
const router = Express.Router();
const Game = require("../../../models/Game");
const isLoggedIn = require( '../../../middlewares/isLoggedIn.js' )
const isOwner = require( '../../../middlewares/isOwner.js' )
const User = require("../../../models/User");


router.post( '/:appID', async( req, res ) => {
  
  
  let { appID } = req.params;
  const { userID, tittle, url, image, collectionClass } = req.body
  const updatedInfo = { userID, tittle, url, image, collectionClass, appID }
  console.log( 'UPDATED: ', updatedInfo )

  appID = appID.toString()
  try {

    const gameDB = await Game.findOne( { userID, appID } )
    // console.log( await gameDB )

    if( await !gameDB ) return res.status( 202 ).json( { message: 'Game does not exist.', updated:false } )
    // console.log( 'UPDATED: ', gameDB )


    const options = {
        new: true,
        runValidators: true
      };
    const id = gameDB._id
    console.log( id )
    const newGame = await Game.findByIdAndUpdate( id, updatedInfo , options )

    return res.status( 200 ).json( { message: 'Game updated.', updated:true, newGame} )

} catch (error) {
    console.log( error );
    return res.status( 500 ).json( { message: 'Something wrong happens!' } )

}
});


module.exports = router;
