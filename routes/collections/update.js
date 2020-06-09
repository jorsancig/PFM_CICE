
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const Game = require("../../models/Game");
const inner = require( '../../config/inner.json' )
const isLoggedIn = require( '../../middlewares/isLoggedIn.js' )
const isOwner = require( '../../middlewares/isOwner.js' )


router.post( '/:appID', [isLoggedIn, isOwner], async( req, res ) => {
  
  
  const { appID } = req.params;
  const { userID, tittle, url, image, collectionClass } = req.body
  const updatedInfo = { userID, tittle, url, image, collectionClass }


  try {
    const options = {
      new: true,
      runValidators: true
    };

    const gameDB = await Game.findOneAndUpdate( { "appID": appID, "userID": userID }, updatedInfo, options);

    res.status( 200 ).json( gameDB )
  } catch (error) {
    console.log(error);
    res.status(400).json( { message: error.message, errors: error.errors, status: 400, ok: false } );
  }
});


module.exports = router;
