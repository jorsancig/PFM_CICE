const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/', async( req, res ) => {
    
    const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v1/' )
    return res.status( 200 ).json( response.data.applist.apps )
} )




module.exports = router