import express from "express";
import Departments from "../models/Departments.js"
import auth from "../auth/Middleware.js";
const router = express.Router();



router.post("/departments", auth ,upload.single('image'), async(req,res)=>{
   if(req.user.role!== "admin"){
    return  res.status(403).json({ message: "Not authorized" });
   }
   const { name, description } = req.body;
     const image = req.file ? req.file.filename : null
 if (!name) return res.status(400).json({ message: "Name is required" });

 const department = await Departments.create({ name, description, image:req.file?.filename })
  res.status(201).json(department);

})

export default router;
