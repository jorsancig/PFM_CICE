const Express = require("express");
const router = Express.Router();
const axios = require( 'axios' )

router.get( '/:game', async( req, res ) => {

    const { game } = req.params;
    if( game !== 'undefined' ){   
        const regex = /[+]/g
        const gameBlanks = game.replace( regex,' ' ).toLowerCase()

        console.log( 'Looking for: ', game, gameBlanks )
        
        try {

            const response = await axios.get( 'https://api.steampowered.com/ISteamApps/GetAppList/v2/' )

            // Searching by game name
            const result = response.data.applist.apps.map( objectGame => {
                const gameName = objectGame.name.toLowerCase()
                if( objectGame.name.toLowerCase().includes( gameBlanks ) ){
                    return objectGame
                }
        
            } )
            
            console.log( 'Getting search response.' )
            // Return for no game
            if( result.length <= 0 ) return res.status( 404 ).json( { message: 'Game not found' } )
            const found = result.filter( element => { 
                if( element != null ){
                    // info = axios.get( `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${element.appid}&count=0&maxlength=0&format=json` )
                    info = ''
                    element.image = `https://steamcdn-a.akamaihd.net/steam/apps/${element.appid}/header.jpg`
                    element.info = info
                    return element
                }
                
            } )

            console.log( 'found' )

            return res.status( 200 ).json( { data: found } )

        } catch (error) {

            console.log( error )
            return res.status( 500 ).json( { message: 'Something wrong happens!' } )

            
        }
    }

} )




module.exports = router