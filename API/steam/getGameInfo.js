const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/:gameID', async( req, res ) => {
    
    const { gameID } = req.params;
console.log( 'gameID', gameID )
    try {
        const response = await axios.get( `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameID}&count=3&maxlength=300&format=json` )
        response.data.appnews.newsitems.steamURL = `https://store.steampowered.com/app/${gameID}`

        return res.status( 200 ).json( response.data )

    } catch (error) {
        // console.log( error )
        return res.status( 500 ).json( { message: 'Something wrong happens.' } )

    }
    
} )




module.exports = router