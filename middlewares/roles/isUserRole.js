const rol = require( '../config/rol.json' )


module.exports = (req, res, next) => {
    if (req.session && req.session.currentUser) {
      console.log(req.session.currentUser);
      if (req.session.currentUser.role === rol.user) next();
    } else res.status(401).json({ message: "Not user"})
  };