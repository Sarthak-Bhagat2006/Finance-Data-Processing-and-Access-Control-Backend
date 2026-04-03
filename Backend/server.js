import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config(); // Load env variables

const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

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