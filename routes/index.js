var express = require("express");
var router = express.Router();

// PAsamos el middleware como segundo parametro y desarrollamos la lógica de la función principal de la ruta index
router.get("/testconnection", (req, res, next) => {
  // en caso de entrar a la función, quiere decir que el usuario esta autorizado
  res.json({ message: "CONNECTED" });
});


module.exports = router;
