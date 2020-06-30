const Express = require("express");
const router = Express.Router();

router.use("/new", require("./create.js"))
router.use("/update", require("./update"))
router.use("/delete", require("./delete.js"))
router.use("/user", require("./read.js"))




module.exports = router