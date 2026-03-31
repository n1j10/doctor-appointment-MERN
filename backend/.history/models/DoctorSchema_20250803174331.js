import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
     name: String,
  specialty: String,
  image: String,
  description: String,
  experienceYears: Number
})

DoctorSchema.pre("save", function (next) {
  if (this.specialty) {
    this.specialty = this.specialty.toLowerCase();
  }
  next();
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
