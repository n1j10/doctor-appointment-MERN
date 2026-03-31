import jwt from "jsonwebtoken"
import getJwtSecret from "../config/jwt.js";

const auth = (requiredRole = null) => {


    return async(req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token)
     return res.status(401).json({ message: 'Access denied. No token provided.' });

    token = token.split(" ")[1]
    let secret = "";
    try {
        secret = getJwtSecret();
    } catch (error) {
        console.error(`Auth middleware failed: ${error.message}`);
        return res.status(500).json({ message: "Server authentication is not configured." });
    }

    jwt.verify(token,secret,(err,decoded)=>{
        if(err) {
         return res.status(400).json({message:'Invalid token.'});

        }else{
            console.log(decoded)
            req.user = decoded

            if(requiredRole && decoded.role !== requiredRole){
                 return res.status(403).json({ 
                 message: 'Access denied. Insufficient permissions.' 
                    });
            }
             next();
        }
    })
}
}

export default auth
