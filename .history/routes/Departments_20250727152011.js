import express from "express";
import Departments from "../models/Departments.js"
import auth from "../auth/Middleware.js";
const router = express.Router();



router.post("/departments", auth , async(req,res)=>{
   if(req.user.role!== "admin"){
    return  res.status(403).json({ message: "Not authorized" });
   }
   const { name, description, image } = req.body;
 if (!name) return res.status(400).json({ message: "Name is required" });

 const department = await Departments.create({ name, description, image })
  res.status(201).json(department);

})
