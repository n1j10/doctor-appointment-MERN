import express from "express";
import Doctor from "../models/DoctorSchema.js"

const router = express.Router();


router.post("/addDoctors", async(req,res)=> {
    try {
        const { name, specialty, description, experienceYears ,} = req.body;
    if(!name || !specialty|| !description || !experienceYears )
     return res.status(400).json({message:"all Fields are required"})

    const newDoctor  = new Doctor({
      name,
      specialty,
      description,
      experienceYears,
     

    })

    const savedDoctors = await newDoctor.save()

     res.status(201).json(savedDoctors);
    } catch (error) {
      console.error(error);
    res.status(500).json({ message:error  });
    }
    



})

export default router;

