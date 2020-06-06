require("dotenv").config();
const Express = require("express");
const app = Express();
const SERVER_PORT = process.env.SERVER_PORT || 5000;


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});