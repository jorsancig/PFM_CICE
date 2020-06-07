const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/:game', async( req, res ) => {

    const { game } = req.params;
    
    try {

        const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v1/' )


        // Searching by game name
        const result = response.data.applist.apps.app.map( objectGame => {
            if( objectGame.name.includes( game ) ){
                return objectGame
            }
    
        } )
        
        console.log( 'Getting serach response.' )

        const found = result.filter( element => { 
            if( element != null ){
                info = axios.get( `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${element.appid}&count=0&maxlength=0&format=json` )
                element.image = `https://steamcdn-a.akamaihd.net/steam/apps/${element.appid}/header.jpg`
                element.info = info
                return element
            }
            
         } )

        // Return for no game
        if( found.length <= 0 ) return res.status( 404 ).json( { message: 'Game not found' } )

        return res.status( 200 ).json( found )

    } catch (error) {

        console.log( error )
        return res.status( 500 ).json( { message: 'Something wrong happens!' } )

        
    }

} )




module.exports = router