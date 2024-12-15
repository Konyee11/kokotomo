import { Router } from "express";
const router = Router();
import User from "../models/user.mjs";
import bcrypt from "bcryptjs";

// CRUD: Create, Read, Update, Delete
// ユーザー情報の更新
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            // パスワードのハッシュ化
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            const user = await User.findByIdAndUpdate(req.params.id, {
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

export default router;
