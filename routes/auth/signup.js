const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const User = require("../../models/User");



router.post( '/', async ( req, res ) => {

    const { email, password, role, name  } = req.body
    // Encriptación
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync( saltRounds )

    try {

        const user = await User.findOne( { email } )
        
        // Status 409 => Conflict
        if ( user ) res.status( 409 ).json( { message: 'The user already exists' } )

    } catch (error) {
        console.log ( error ); 
        res.status( 500 ).json( { message: 'Something wrong happens!' } )
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
        res.status( 200 ).json( { message: 'User authenticated.', userDB } )

    } catch (error) {
        
        console.log( error );
        res.status( 500 ).json( { message: 'Something wrong happens!' } )

    }
        

} )






module.exports = router