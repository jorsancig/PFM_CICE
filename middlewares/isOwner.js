
const rol = require( '../config/rol.json' )



module.exports = (req, res, next) => {
    console.log(req.body)
    if( req.session && req.session.currentUser && (req.session.currentUser.role === rol.admin || req.session.currentUser.role === rol.superAdmin ) ){

        next()

    }else{
        if( req.body.userID == req.session.currentUser.email ){
            next() 
        }else{
            console.log( req.body.userID, req.session.currentUser.email  )
            res.status(401).json({ message: "Logged user and collection user is not the same one."})
        }
        
        }
    }