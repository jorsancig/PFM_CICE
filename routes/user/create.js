
const Express = require("express");
const router = Express.Router();
const User = require("../../models/User");

router.put("/", async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const user = new User( { name, email, password } );
    console.log(user);

    const userDB = await user.save();

    res.status(200).json({ userDB });
  } catch (error) {
    console.log(error);
    res.status(400).json( { message: error.message, errors: error.errors, status: 400, ok: false } );
  }
});



module.exports = router





