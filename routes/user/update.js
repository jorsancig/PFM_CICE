const Express = require("express");
const router = Express.Router();
const User = require("../../models/User");

router.post("/:id", async (req, res) => {
  const { id } = req.params;

//   const { name, email, role, password, birth } = req.body;
  const userdata = req.body;

  try {
    const options = {
      new: true,
      runValidators: true
    };

    const userDB = await User.findByIdAndUpdate(id, userdata, options);

    res.json({ userDB });
  } catch (error) {
    console.log(error);
    res.status(400).json( { message: error.message, errors: error.errors, status: 400, ok: false } );
  }
});


module.exports = router;
