import express from "express";
import Appointment from "../models/AppointmentSchema.js"
import auth from "../auth/Middleware.js";
const router = express.Router();

router.post("/createAppointment", auth(),  async(req,res)=>{
        const {doctor,date,reason} = req.body
        if(!doctor || !date || !reason) return res.status(400).json({ message: "Missing fields" });

        const appointment = await Appointment.create({
            user: req.user.id,
            doctor,
            date,
            reason

        })

        res.status(201).json(appointment);
})

router.get("/myAppointments", auth, async(req,res)=>{
    const appointments = await Appointment.find({user:req.user.id}).populate("doctor")
    res.json(appointments);
})


// router.post("/deleteAppointment/:id",async (req, res)=>{
//     try {
//         const {id} = req.params
        
//         const appointment = await Appointment.findByIdAndDelete(id)
//         if(!appointment) return res.status(404).json({ error: 'appointment not found' });
//          res.status(200).json({ message: 'appointment deleted successfully' });
//     } catch (error) {
//          console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })








export default router;




