import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js"
import User from "./routes/user.js"
import Departments from "./routes/Departments.js";
import Doctor from "./routes/doctor.js"
import Appointment from "./routes/appointment.js"
const app = express()
app.use(express.json())

dotenv.config();
const PORT = process.env.PORT || 3000

app.use(cors())
app.use("/user", User);
app.use("/doctors", Doctor);
app.use("/appointments", Appointment);
app.use("/departments", Departments);

app.use("/uploads",express.static("uploads"))

const DB_RETRY_MS = Number(process.env.DB_RETRY_MS || 5000);
let isServerListening = false;

const startServer = async () => {
    try {
        await connectDB();
        if (!isServerListening) {
            app.listen(PORT , ()=>{
                console.log(`server is running on port ${PORT}`)
            });
            isServerListening = true;
        }
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        console.log(`Retrying MongoDB connection in ${DB_RETRY_MS / 1000}s...`);
        setTimeout(startServer, DB_RETRY_MS);
    }
};

startServer();
