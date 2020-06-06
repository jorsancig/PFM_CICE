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

const index = require( "./routes" );



// -- V. ENTORNO --
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_NAME =  process.env.SERVER || 'localhost';
const DB_PORT = process.env.DB_PORT || '27027';



// -- USE --
app.use( "/raiz", index )

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json() );



// DB connection
mongoose
    .connect( `mongodb://${SERVER_NAME}:${DB_PORT}`, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => console.log( `Connected to nongo on port ${DB_PORT}` ) )
    .catch( err => { throw err } )



// Ruta escape
app.use( ( req, res ) => { 
    res.status( 404 ).json( { message: "route not found" } );
 }  )


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});