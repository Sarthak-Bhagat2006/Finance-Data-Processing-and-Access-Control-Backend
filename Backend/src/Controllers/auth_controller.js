import { User } from "../models/user.js";
import { generateToken } from "../Utils/generate_token.js";


//Register controller 
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        //Check
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        //Create
        const user = await User.create({
            name,
            email,
            password,
            role: role || "viewer", // defaults to viewer
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Server error",
        });
    }
};

//Login controller 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
            });
        }

        //Find
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        //Generate token
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};