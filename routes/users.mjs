import { Router } from "express";
const router = Router();
import User from "../models/user.mjs";
import bcrypt from "bcryptjs";

// 特定のユーザー情報の取得
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc; // パスワードと更新日時を除外
        return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ユーザー情報の更新
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                // パスワードがある場合はハッシュ化
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("ユーザー情報が更新されました");
        } else {
            return res
                .status(403)
                .json("他のユーザーの情報を更新することはできません");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ユーザー情報の削除
router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("ユーザー情報が削除されました");
        } else {
            return res
                .status(403)
                .json("他のユーザーの情報を削除することはできません");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
