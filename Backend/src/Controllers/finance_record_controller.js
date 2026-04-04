import { FinanceRecord } from "../Models/finance_record.js";

// create
export const createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, notes } = req.body;

        if (!amount || !type || !category || !date) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const record = await FinanceRecord.create({
            userId: req.user.userId,
            amount,
            type,
            category,
            date,
            notes,
        });

        res.status(201).json({
            message: "Record created successfully",
            record,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



// get records (with filtering)
export const getRecords = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {
            userId: req.user.userId,
        };

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const records = await FinanceRecord.find(filter).sort({ date: -1 });

        res.status(200).json({
            count: records.length,
            records,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



// update
export const updateRecord = async (req, res) => {
    try {
        const record = await FinanceRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found",
            });
        }

        //check ownership
        if (record.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized to update this record",
            });
        }

        const updatedRecord = await FinanceRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Record updated successfully",
            record: updatedRecord,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



// delete
export const deleteRecord = async (req, res) => {
    try {
        const record = await FinanceRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found",
            });
        }

        // check ownership
        if (record.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized to delete this record",
            });
        }

        await FinanceRecord.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Record deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};