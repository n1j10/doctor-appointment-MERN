import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    user : {
        
     type: mongoose.Schema.Types.ObjectId,ref:"User"
    },

    doctor :{
         type: mongoose.Schema.Types.ObjectId,ref:"Doctor"
    },

    date:String,

    reason: String


})

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
