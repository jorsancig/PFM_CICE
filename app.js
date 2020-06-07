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

const session = require( 'express-session' )
const MongoStore = require( 'connect-mongo' )( session )



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
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore( {
    mongooseConnection: mongoose.connection
  } )
} ) )



// -- CONFIG. FILES --
//Available rols 
const rol = require( './config/rol.json' )




// -- ROUTES --
app.use( "/", require("./routes"));
app.use( "/users", require( './routes/user/' ) )
app.use( "/auth",  require( './routes/auth/' ) )
app.use("/userAccess", require("./routes/auth/userAccess"));




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