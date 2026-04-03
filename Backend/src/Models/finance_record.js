import mongoose from "mongoose";

const financeRecordSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: [0, "Amount must be positive"],
        },

        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

//Indexing
financeRecordSchema.index({ date: 1 });
financeRecordSchema.index({ category: 1 });
financeRecordSchema.index({ type: 1 });

export const FinanceRecord = mongoose.model("FinanceRecord", financeRecordSchema);