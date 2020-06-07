const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/', async( req, res ) => {
    
    const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v2/' )
    console.log( 99999999999 )
    return res.status( 200 ).json( response.data.applist.apps )
} )




module.exports = router