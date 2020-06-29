
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const Game = require("../../../models/Game");
const inner = require( '../../../config/inner.json' )
const isLoggedIn = require( '../../../middlewares/isLoggedIn.js' )
const isOwner = require( '../../../middlewares/isOwner.js' )
const User = require("../../../models/User");





router.post( '/',/* [isLoggedIn, isOwner], */ async( req, res ) => {
    console.log( 'ADD' )
    const { userID, tittle, appID, url, image, collectionClass } = req.body
    console.log( userID, tittle, appID, url, image, collectionClass )
    
    try {
        const user = await User.findOne( { "email": userID } )

        // Status 409 => Conflict
        if ( !user ) return res.status( 409 ).json( { message: 'The user does not exists' } )

        const gameDB = await Game.findOne( { 'userID': userID, 'appID': appID } );

        if( gameDB ) return res.status( 409 ).json( { message: 'Game is already in a collection' }, )
        
    } catch (error) {
        console.log( error )
        res.status( 409 ).json( { message: 'Something wrong happens!' } )
    }

    
    const game = new Game( {
        userID,
        tittle,
        appID:appID.toString(),
        url,
        image,
        collectionClass
    } )

    try {
        const gameDB = await game.save()
        return res.status( 200 ).json( { message: 'Gamme added.' } )
    } catch (error) {
        console.log( error )
        return res.status( 500 ).json( { message: 'Something wrong happens!' } )

    }



})


module.exports = router