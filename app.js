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
const path = require("path");
var express = require("express");
var router = express.Router();


// LOGIN
// Basic
const session = require( 'express-session' )
const MongoStore = require( 'connect-mongo' )( session )
//Social
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy



// -- .env --
const SERVER_PORT = process.env.PORT || 5000;
const SERVER_NAME =  process.env.HOST || '0.0.0.0';
const DB_PORT = process.env.DB_PORT || '27027';
const DB_NAME = process.env.DB_NAME || 'PFM_CICE';
const SECRET = process.env.SECRET || 'basic-auth';



// -- USING --
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
// const rol = require( './config/rol.json' )




// -- ROUTES --
// app.use( "/", require("./routes"));
app.use( "/api/users", require( './routes/api/user' ) )
app.use( "/api/auth",  require( './routes/api/auth' ) )
app.use( "/api/collections",  require( './routes/api/collections' ) )
app.use( "/api/userAccess", require("./routes/api/auth/userAccess"));
app.use( "/api/external",  require( './API' ) )
app.use( "/",  require( './routes' ) )

// app.use( "/", require( "./routes/" ) )
router.get("/",  (req, res, next) => {
  // en caso de entrar a la función, quiere decir que el usuario esta autorizado
  res.json({ message: "Autorizado" });
});

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");


// DB connection
mongoose
    .connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } )
    .then( () => console.log( `Connected to mongo on port ${DB_PORT} to ${DB_NAME} database` ) )
    .catch( err => { throw err } )



// Ruta escape
app.use(function(req, res, next) {
    res.status(404).json({ message: "Not found" });
  });







// Leer localhost de variables y puertos


 
// app.listen(SERVER_PORT, () => {
//   console.log(`Server listening on port ${SERVER_PORT} `);
// });



module.exports = app