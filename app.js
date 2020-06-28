require("dotenv").config();
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");


var app = express();

//-----------------------------------------------------------//
// 1. CONFIGURACIÓN DE LA ESTRATEGIA DE PASSPORT LOCAL Y JWT //
//-----------------------------------------------------------//


//----------------------------//
//    4. SUBIDA DE ARCHIVOS   //
//----------------------------//
// 4.1. configuración de middleware de recogida de archivos
// 4.2. (continúa en ./routes/upload/upload)

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Not found" });
});



module.exports = app;
