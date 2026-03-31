import express from "express";
import Departments from "../models/Departments.js"
import auth from "../auth/Middleware.js";
import multer from "multer";
 
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.post("/addDepartments", auth("admin") ,upload.single('image'), async(req,res)=>{
//    if(req.user.role!== "admin"){
//     return  res.status(403).json({ message: "Not authorized" });
//    }
   const { name, description } = req.body;
     const image = req.file ? req.file.filename : null
 if (!name) return res.status(400).json({ message: "Name is required" });

 const department = await Departments.create({ name, description, image:req.file?.filename })
  res.status(201).json(department);

})

export default router;
