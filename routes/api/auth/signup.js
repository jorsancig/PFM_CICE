const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const User = require("../../../models/User");
const inner = require( '../../../config/inner.json' )




router.post( '/', async ( req, res ) => {

    const { email, password, role, name  } = req.body
    // Encriptación
    const SALT_ROUNDS = inner.salt_rounds;

    const salt = bcrypt.genSaltSync( SALT_ROUNDS )

    try {

        const user = await User.findOne( { email } )
        
        // Status 409 => Conflict
        if ( user ) return res.status( 409 ).json( { message: 'The user already exists' } )

    } catch (error) {
        console.log ( error ); 
        return res.status( 500 ).json( { message: 'Something wrong happens!' } )
    }


    const hashPass = bcrypt.hashSync( password, salt )

    const user = new User( {
        email,
        password: hashPass,
        role,
        name
    } )

    try {
        
        const userDB = await user.save();
        return res.status( 200 ).json( { message: 'User authenticated.', userDB } )

    } catch (error) {
        
        console.log( error );
        return res.status( 500 ).json( { message: 'Something wrong happens!' } )

    }
        

} )






module.exports = router