
// const Express = require("express");
// const router = Express.Router();
// const Game = require("../models/Game");
// const innerClasses = require( '../config/gameClass.json' )
// const isLoggedIn = require( '../middlewares/isLoggedIn.js' )
// const isOwner = require( '../middlewares/isOwner.js' )
import App from '../views/app';
import ReactDOM from 'react-dom';
import React from 'react';



router.get("/", (req, res) => {
  
  ReactDOM.render(<App />, document.getElementById('root'));
  // res.send('hello world')
});

router.post("/", (req, res) => {
  console.log( 1231231322132 )
  // res.send('hello world')
});



module.exports = router;
