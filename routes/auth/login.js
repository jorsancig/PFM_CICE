
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const User = require("../../models/User");
const inner = require( '../../config/inner.json' )




router.post( '/', async( req, res ) => {

    const { email, password } = req.body
    const SALT_ROUNDS =  inner.salt_rounds;
    const salt = bcrypt.genSaltSync( 10 )


    try {
       
        const userDB = await User.findOne( { email } )

        if( !userDB ) return res.status( 404 ).json( { message: 'User does not exist.' } )

        const passwordDB = userDB.password
        const hashPass = bcrypt.hashSync( password, salt )

        if( !bcrypt.compareSync( password, passwordDB ) ) return res.status( 401 ).json( { message: 'Password is not correct.' } )

        req.session.currentUser = userDB
        return res.status( 200 ).json( {message: 'User authenticated'} )



    } catch (error) {
        console.log( error )
        return res.status( 500 ).json( { messge: 'Something wrong happens!' } )
        
    }
})


module.exports = router