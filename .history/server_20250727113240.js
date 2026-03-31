import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js"
import User from "./routes/user.js"
const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())

dotenv.config();
connectDB();
app.use(cors())
app.use("/user", User);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});