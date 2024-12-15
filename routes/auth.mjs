import { Router } from "express";
const router = Router();
import User from "../models/user.mjs";

// ユーザーの登録
router.post("/register", async (req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
