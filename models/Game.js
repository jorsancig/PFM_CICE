const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const gameClass = require( '../config/gameClass.json' )

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  userID: {
    type: String,
    required: [ true, 'userID is mandatory' ]
  },
  tittle: {
    type: String,
    required: [ true, 'name is mandatory' ]
  },
  appID: {
    type: Object,
    required: [ true, 'appID is mandatory' ]
  },
  url:{
    type: String,
    default: null
  },
  image:{
    type: String,
    default: null
  },
  collectionClass: {
    type: String,
    default: gameClass.collection,
    enum: {
      values: [ gameClass.follow, gameClass.love, gameClass.pendent, gameClass.collection ],
      message: "{VALUE} no es un valor valido en {PATH}"
    },
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { 
    timeStamps: true,
    createdAt: true 
    });

    gameSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("Games", gameSchema);
