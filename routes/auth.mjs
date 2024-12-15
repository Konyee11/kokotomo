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

// ユーザーのログイン
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("ユーザーが見つかりません");
        const validPassword = user.password === req.body.password;
        !validPassword && res.status(400).json("パスワードが間違っています");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
