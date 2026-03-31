import express from "express";
const router = express.Router();
import User from "../models/UserSchema.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import getJwtSecret from "../config/jwt.js";


router.post("/register", async (req,res)=>{
    try {
        const {name, email, password,role = "user"} = req.body
        if(!name || !email || !password)
             return res.status(400).json({ message: "All fields are required" });

        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({message:"User already exists"})

            const hashedPassword = await bcrypt.hash(password, 10)
            //create new user
            const newUser = await User.create({name,email, password: hashedPassword,role  })
            const secret = getJwtSecret();
            let token = jwt.sign({email,id:newUser._id, role: newUser.role},secret,{expiresIn:"1w"})

            return res.status(201).json({message:"user registerd successfully", token, user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }})
    } catch (error) {
        console.error("Register failed:", error);
        const details = error?.message || "Unknown error";
        return res.status(500).json({
            message: "Registration failed",
            ...(process.env.NODE_ENV !== "production" ? { details } : {}),
        });
    }
})




    router.post ("/signin", async(req,res)=> {
     try {
         const { email, password } = req.body;
         if(!email || ! password)
        return res.status(400).json({ message: "Email and password are required" });

         const user = await User.findOne({email})
         if(!user) return res.status(400).json({ message: "invalid credentials" });

         const match = await bcrypt.compare(password,user.password)
         
         if(!match) return res.status(400).json({message:"Password is Not Correct"})
         const secret = getJwtSecret();

            const token = jwt.sign({id:user._id,role: user.role},secret,{expiresIn:"1w"})

             return res.status(201).json({message:"user Logged In successfully", token,user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }})
     } catch (error) {
        console.error("Signin failed:", error);
        const details = error?.message || "Unknown error";
        return res.status(500).json({
            message: "Sign in failed",
            ...(process.env.NODE_ENV !== "production" ? { details } : {}),
        });
     }




    })


export default router;
