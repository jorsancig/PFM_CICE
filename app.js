// ----------------------
// ----------------------
// -------- APPP --------
// ----------------------
// ----------------------


// -----------------------
// ---- DECLARACIONES ----
// -----------------------

// -- REQUIRES --
require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require( "mongoose" );

// LOGIN
// Basic
const session = require( 'express-session' )
const MongoStore = require( 'connect-mongo' )( session )
//Social
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy



// -- .env --
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_NAME =  process.env.SERVER || 'localhost';
const DB_PORT = process.env.DB_PORT || '27027';
const DB_NAME = process.env.DB_NAME || 'PFM_CICE';
const SECRET = process.env.SECRET || 'basic-auth';



// -- USING --
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Sistema de sesiones
app.use( session( {
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore( {
    mongooseConnection: mongoose.connection
  } )
} ) )


// PASSPORT
// const User = require("./models/User");
// const bcrypt = require( 'bcryptjs' )

// app.use( passport.initialize() )
// app.use( passport.session() )
// passport.serializeUser( ( user, callback ) => {
//   callback( null, user )
// } )
// passport.deserializeUser( async( id, callback ) => {
//   console.log( 'DESERIALIZER' )
//   try {
//     const userDB = await User.findById( id )
//     if( !user ) return callback( null, false, 'User does not exist.' )

//     return callback( null, user )

//   } catch (error) {
//     console.log( error )
//     return callback( error )
//   }
// } )

// passport.use( new LocalStrategy( async ( usernameField, password, callback ) => {
//   console.log( 'LOCAL STRATEGY' )

//   const SALT_ROUNDS =  inner.salt_rounds;
//   const salt = bcrypt.genSaltSync( SALT_ROUNDS )

//   try {
//     const userDB = await User.findOne( { username } )

//     if( !userDB ) return next( null, false, { message: 'User does not exist.' } )
  
//     const passwordDB = userDB.password
//     const hashPass = bcrypt.hashSync( password, salt )
  
//     if( !bcrypt.compareSync( password, passwordDB ) ) return next( null, false, { message: 'Password is not correct.' } )
  
//     next( null, user )
  
//   } catch (error) {
//     next( error )
//   }

// } ) )


// -- CONFIG. FILES --
//Available rols 
const rol = require( './config/rol.json' )




// -- ROUTES --
app.use( "/", require("./routes"));
app.use( "/users", require( './routes/user/' ) )
app.use( "/auth",  require( './routes/auth/' ) )
app.use( "/collections",  require( './routes/collections/' ) )
app.use("/userAccess", require("./routes/auth/userAccess"));
app.use( "/external",  require( './API' ) )





// DB connection
mongoose
    .connect( `mongodb://${SERVER_NAME}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => console.log( `Connected to mongo on port ${DB_PORT} to ${DB_NAME} database` ) )
    .catch( err => { throw err } )



// Ruta escape
app.use( ( req, res ) => {  
    res.status( 404 ).json( { message: "route not found" } ); 
 }  )








 
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});



module.exports = app