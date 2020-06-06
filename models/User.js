const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const rol = require( '../config/rol.json' )

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "Email es obligatorio"],
    unique: true
  },
  nickname: {
    type: String,
    default: null,
    unique: false
  },
  password: {
    type: Object,
    required: [true, "Password es obligatorio"]
  },
  state: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: rol.user,
    enum: {
      values: [ rol.superAdmin, rol.admin, rol.manager, rol.user ],
      message: "{VALUE} no es un valor valido en {PATH}"
    },
  },
  birth: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
    timeStamps: true,
    createdAt: true 
    });

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("User", userSchema);
