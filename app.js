require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const index = require( "./routes" );

app.use( "/raiz", index )


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});