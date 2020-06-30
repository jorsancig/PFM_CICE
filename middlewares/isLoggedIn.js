module.exports = (req, res, next) => {
    // console.log(req.session)
        req.session.currentUser
        ? next() 
        : res.status(401).json({ message: "Unauthorized"})
    
    }