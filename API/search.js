const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

const searchSteam = require( './steam/search' )

router.get( '/:game', async( req, res ) => {

    const { game } = req.params;

    try {
        return res.status( 200 ).json( { message: 'Okey' } )
    } catch (error) {
        
    }

} )

module.exports = router