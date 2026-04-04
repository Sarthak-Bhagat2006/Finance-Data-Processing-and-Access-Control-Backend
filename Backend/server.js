import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/Routes/auth_routes";


dotenv.config(); // Load env variables

const app = express();

app.use(express.json());
app.use(cors());

// Test route
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

//Auth routes 
app.use("/api/auth", authRoutes);


// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
};

//server connection
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});