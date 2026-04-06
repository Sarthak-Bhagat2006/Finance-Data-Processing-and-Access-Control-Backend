import mongoose from "mongoose";
import { FinanceRecord } from "../Models/finance_record.js";


//summary
export const getSummary = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await FinanceRecord.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" },
                },
            },
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        result.forEach((item) => {
            if (item._id === "income") totalIncome = item.total;
            if (item._id === "expense") totalExpense = item.total;
        });

        res.status(200).json({
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



//category wise 
export const getCategoryWise = async (req, res) => {
    try {
        const userId = req.user.userId;

        const data = await FinanceRecord.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: { totalAmount: -1 },
            },
        ]);

        res.status(200).json({
            data,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



//trends
export const getTrends = async (req, res) => {
    try {
        const userId = req.user.userId;

        const data = await FinanceRecord.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: { "_id": 1 },
            },
        ]);

        res.status(200).json({
            data,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};