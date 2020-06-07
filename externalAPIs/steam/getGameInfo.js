const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/:gameID', async( req, res ) => {
    
    const { gameID } = req.params;

    try {

        const response = await axios.get( `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=400&count=3&maxlength=300&format=json` )
        response.data.appnews.newsitems.steamURL = `https://store.steampowered.com/app/${gameID}`
        console.log( response.data.appnews.newsitems )
        return res.status( 200 ).json( response.data.appnews.newsitems.steamURL )

    } catch (error) {

        return res.status( 500 ).json( { message: 'Something wrong happens.' } )

    }
    
    const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v1/' )
} )




module.exports = router