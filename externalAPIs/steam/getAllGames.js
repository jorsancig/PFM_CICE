const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/', async( req, res ) => {
    try {

        const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v1/' )
        return res.status( 200 ).json( response.data.applist.apps )
    
    } catch (error) {

        return res.status( 500 ).json( { message: 'Something wrong happens.' } )

    }
} )




module.exports = router