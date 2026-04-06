import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/Routes/auth_routes.js";
import recordRoutes from "./src/Routes/finance_record_routes.js"
import dashboardRoutes from "./src/Routes/dashboard_routes.js"


dotenv.config(); // Load env variables

const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

//Auth routes 
app.use("/api/auth", authRoutes);
//Record routes
app.use("/api/records", recordRoutes);
//Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

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