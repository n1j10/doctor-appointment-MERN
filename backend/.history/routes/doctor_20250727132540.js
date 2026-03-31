import express from "express";
import Doctor from "../models/DoctorSchema.js"

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

router.post("/addDoctors", async(req,res)=> {
    try {
        const { name, specialty, description, experienceYears , image} = req.body;
    if(!name || !specialty|| !description || !experienceYears || image)
     return res.status(400).json({message:"all Fields are required"})

    const newDoctor  = new Doctor({
      name,
      specialty,
      description,
      experienceYears,
      image
     

    })

    const savedDoctors = await newDoctor.save()

     res.status(201).json(savedDoctors);
    } catch (error) {
      console.error(error);
    res.status(500).json({ message:error  });
    }
    



})

export default router;

