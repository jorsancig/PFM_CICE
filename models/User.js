const mongoose = require( "mongoose" );
const rol = require( '../config/rol.json' ) 

const Schema = mongoose.Schema;

const userSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is mandatory' ]
        },
    email: {
        type: String,
        required: [ true, 'Name is mandatory' ]
        },
    nickname: {
        type: String,
        required: [ true, 'Name is mandatory' ]
        },
    password: {
        type: String,
        required: [ true, 'Password is mandatory' ]
        },
    birth: {
        type: Date,
        required: [ true, 'Name is mandatory' ]
        },
    state: {
        type: Boolean,
        required: [ true, 'State is mandatory' ],
        default: true
        },
    rol: {
        type: String,
        required: [ true, 'Rol is mandatory' ],
        default: rol.user
    }
} ); 


module.export = mongoose.model( 'User', userSchema );