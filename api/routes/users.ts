import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import auth, { RequestWithUser } from "../middleware/auth";
import { imagesUpload } from "../multer";

const usersRouter = express.Router();

usersRouter.post("/register", imagesUpload.single("avatar"), async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            res.status(400).send({ error: "User already exists" });
            return;
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role,
            specialization: req.body.specialization,
            avatar: req.file ? `images/${req.file.filename}` : undefined,
        });

        user.generateToken();
        await user.save();

        const userResponse = {
            _id: user._id,
            username: user.username,
            name: user.name,
            specialization: user.specialization,
            avatar: user.avatar,
            token: user.token,
        };

        res.status(201).send({ message: "User registered successfully", user: userResponse });
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send({ error: error.message });
            return;
        }
        next(error);
    }
});

usersRouter.post("/session", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.checkPassword(req.body.password))) {
            res.status(400).send({ error: "Invalid username or password" });
            return;
        }

        user.generateToken();
        await user.save();

        const userResponse = {
            _id: user._id,
            username: user.username,
            name: user.name,
            specialization: user.specialization,
            avatar: user.avatar,
            token: user.token,
        };

        res.send({ message: "Login successful", user: userResponse });
    } catch (error) {
        next(error);
    }
});

usersRouter.delete("/session", auth, async (req, res, next) => {
    const reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    try {
        const user = await User.findOne({ _id: userFromAuth._id });
        if (user) {
            user.generateToken();
            await user.save();
            res.send({ message: "Logout successful" });
        }
    } catch (error) {
        next(error);
    }
});

export default usersRouter;
