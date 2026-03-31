import jwt from "jsonwebtoken"
const auth = async(req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token)
     return res.status(401).json({ message: 'Access denied. No token provided.' });

    token = token.split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) {
         return res.status(400).json({message:'Invalid token.'});

        }else{
            console.log(decoded)
            req.user = decoded
             next();
        }
    })
}



export default auth
