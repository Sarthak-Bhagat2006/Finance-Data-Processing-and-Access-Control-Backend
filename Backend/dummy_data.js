import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/Models/user.js"
import { FinanceRecord } from "./src/Models/finance_record.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear old data
        await User.deleteMany();
        await FinanceRecord.deleteMany();

        console.log("Old data removed");

        // Create users
        const users = await User.create([
            {
                name: "Admin User",
                email: "admin@gmail.com",
                password: "123456",
                role: "admin",
            },
            {
                name: "Analyst User",
                email: "analyst@gmail.com",
                password: "123456",
                role: "analyst",
            },
            {
                name: "Viewer User",
                email: "viewer@gmail.com",
                password: "123456",
                role: "viewer",
            },
        ]);

        console.log("Users created");

        // Create records
        const records = [
            {
                userId: users[0]._id,
                amount: 50000,
                type: "income",
                category: "salary",
                date: new Date("2026-04-01"),
                notes: "Monthly salary",
            },
            {
                userId: users[0]._id,
                amount: 10000,
                type: "expense",
                category: "rent",
                date: new Date("2026-04-02"),
            },
            {
                userId: users[1]._id,
                amount: 20000,
                type: "income",
                category: "freelance",
                date: new Date("2026-04-03"),
            },
        ];

        await FinanceRecord.insertMany(records);

        console.log("Records created");

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();