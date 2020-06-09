module.exports = (req, res, next) => {
    console.log(req.body)

    if( req.body.userID == req.session.currentUser.email ){
        next() 
    }else{
        res.status(401).json({ message: "Logged user and collection user is not the same one."})
    }
    
    }