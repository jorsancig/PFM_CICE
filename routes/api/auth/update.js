
const Express = require("express");
const router = Express.Router();
const bcrypt = require( 'bcryptjs' )
const User = require("../../../models/User");
const inner = require( '../../../config/inner.json' )




router.post( '/', async( req, res ) => {

    const { currentUsername, newUsername, currentPass, newPassword, name, nickname, birth } = req.body
    const SALT_ROUNDS =  inner.salt_rounds;
    const salt = bcrypt.genSaltSync( SALT_ROUNDS )
console.log( currentUsername, newUsername, currentPass, newPassword, name, nickname, birth )
    try {

        const userDB = await User.findOne( { "email":currentUsername } )
        console.log( userDB.name )
        if( !userDB ) return res.status( 404 ).json( { message: 'User does not exist.' } )

        const passwordDB = userDB.password
        const hashPass = bcrypt.hashSync( currentPass, salt )
        if( !bcrypt.compareSync( currentPass, passwordDB ) ) return res.status( 401 ).json( { message: 'Password is not correct.' } )

        const newHashPass = bcrypt.hashSync( newPassword, salt )

        const params = {
            password: newPassword != '' ? newHashPass : hashPass,
            role: userDB.role,
            name,
            nickname,
            birth
        }
        const options = {
            new: true,
            runValidators: true
          };
        const id = userDB._id
        console.log( id )
        const newUser = await User.findByIdAndUpdate( id, params , options )

        req.session.currentUser = newUser

        return res.status( 200 ).json( { message: 'User updated.', newUser} )

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json( { message: 'Something wrong happens!' } )

    }

})


module.exports = router