const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')

const authMiddleware = (req , res ,next) =>{
    try{const authHeader = req.headers.authorization ;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error ("authorization header not sent properly");
        }


        const len = authHeader.length ;
        const actualToken = authHeader.slice(7 , len);
        const status = jwt.verify(actualToken , JWT_SECRET) ;
        req.username  = status.username ;
        next()
    }
    
    catch(err){
        console.log(err);
        if(err.name === 'TokenExpiredError') return res.status(403).json({
            message : "Token has expired"
        })
        else if(err.name === "JsonWebTokenError") return res.status(403).json({
            message : "Invalid Token"
        })
        else if(err.message === "authorization header not sent properly") return res.status(403).json({
            message : "Headers not sent properly"
        })
        return res.status(403) ;// if any other issue 
    }

}

module.exports = authMiddleware