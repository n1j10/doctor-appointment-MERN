import express from "express";
import Departments from "../models/Departments.js"
import auth from "../auth/Middleware.js";
const router = express.Router();



router.post("/departments", auth , async(req,res)=>{
   if(req.user.role!== "admin"){
    return  res.status(403).json({ message: "Not authorized" });
   }
})
