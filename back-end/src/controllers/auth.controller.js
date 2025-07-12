import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../lib/customer.js"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js";
// import { Profiler } from "react";

export const signup = async (req, res) => {
    // console.log(req.body)
    // console.log(req.headers)
    const { fullName, email, password } = req.body;
    console.log(req.body)
    console.log(fullName + " " + email + " " + password)
    try {
        if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required" })
        if (password.length < 6) return res.status(400).json({ message: "password must be at lwast 6 characters" })
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        // console.log(user)
        console.log(await comparePassword(password, user.password))
        if (!user) return res.status(400).json({ message: "Invalid credentials" })
        if (!await comparePassword(password, user.password)) return res.status(400).json({ message: "Invalid credentials" })
        generateToken(user._id, res)
        res.status(200).json({ _id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic })
    } catch (error) {
        console.log("Error in login controller " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json(({ message: "logged out successfully" }))
    } catch (error) {
        console.log("Error in logout controller " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body
    console.log(profilePic)
    try {
        const userId = req.user._id;
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("Error in update controller " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// exports = {siginup, login, logout}