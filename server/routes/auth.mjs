import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import User from "../models/user.mjs";

// ユーザーの登録
router.post("/register", async (req, res) => {
    try {
        // パスワードのハッシュ化
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // ユーザーの作成
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // ユーザーの保存
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ユーザーのログイン
router.post("/login", async (req, res) => {
    try {
        // ユーザーの検索
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "ユーザーが見つかりません" });
        }

        // パスワードの検証
        const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: "パスワードが間違っています" });
        }

        // 認証成功
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
