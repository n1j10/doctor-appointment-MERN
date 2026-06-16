import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"
import User from "./routes/user.js"
import Departments from "./routes/Departments.js";
import Doctor from "./routes/doctor.js"
import Appointment from "./routes/appointment.js"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(cors())

// Connect to DB (cached for serverless)
let isConnected = false;
const ensureDB = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

// Connect on startup
ensureDB().catch(err => console.error("Initial DB connection failed:", err.message));

// Routes
app.use("/user", User);
app.use("/doctors", Doctor);
app.use("/appointments", Appointment);
app.use("/departments", Departments);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root route so "GET /" doesn't return "Cannot GET /"
app.get("/", (req, res) => {
    res.json({ message: "Doctor Appointment API is running" });
});

// Only listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;
