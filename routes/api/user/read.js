const Express = require("express");
const router = Express.Router();
const User = require("../../../models/User");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const options = {
      new: true,
      runValidators: true
    };

    const userDB = await User.find( { _id: id }, { name: 1, birth: 1, createdAt: 1, nickname: 1, _id : 0, password: 0 });

    res.json({ userDB });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


module.exports = router;
