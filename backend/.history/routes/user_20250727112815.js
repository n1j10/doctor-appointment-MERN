import express from "express";
const router = express.Router();
import User from "../models/UserSchema.js"
import jwt from 'jsonwebtoken';


router.post("/register", async (req,res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password)
         return res.status(400).json({ message: "All fields are required" });

    const userExist = await User.findOne({email})
    if(userExist) return res.status(400).json({message:"User already exists"})

        const newUser = await User.create({name,email, password})

        let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1w"})

        return res.status(201).json({message:"user registerd successfully", token,user:newUser})



})

export default router;
