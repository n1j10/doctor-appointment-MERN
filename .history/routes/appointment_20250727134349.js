import express from "express";
import Appointment from "../models/AppointmentSchema.js"


router.post("/createAppointment", async(req,res)=>{
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








export default router;




