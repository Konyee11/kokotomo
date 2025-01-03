import { Router } from "express";
const router = Router();
import User from "../models/user.mjs";
import bcrypt from "bcryptjs";

// 特定のユーザー情報の取得
// router.get("/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         const { password, updatedAt, ...other } = user._doc; // パスワードと更新日時を除外
//         return res.status(200).json(other);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

// クエリパラメーターで指定されたユーザー情報の取得
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
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

// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            // フォローするユーザーが自分自身でない場合
            const user = await User.findById(req.params.id); // フォローされるユーザー
            const currentUser = await User.findById(req.body.userId); // フォローするユーザー
            if (!user.followers.includes(currentUser._id)) {
                // フォローするユーザーがすでにフォローしていない場合
                await user.updateOne({
                    $push: { followers: currentUser._id },
                });
                await currentUser.updateOne({
                    $push: { followings: user._id },
                });
                return res.status(200).json("ユーザーをフォローしました");
            } else {
                // フォローするユーザーがすでにフォローしている場合
                return res
                    .status(403)
                    .json("すでにユーザーをフォローしています");
            }
        } else {
            // フォローするユーザーが自分自身の場合
            return res
                .status(403)
                .json("自分自身をフォローすることはできません");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            // フォロー解除するユーザーが自分自身でない場合
            const user = await User.findById(req.params.id); // フォロー解除されるユーザー
            const currentUser = await User.findById(req.body.userId); // フォロー解除するユーザー
            if (user.followers.includes(currentUser._id)) {
                // フォロー解除するユーザーがすでにフォローしている場合
                await user.updateOne({
                    $pull: { followers: currentUser._id },
                });
                await currentUser.updateOne({
                    $pull: { followings: user._id },
                });
                return res.status(200).json("ユーザーのフォローを解除しました");
            } else {
                // フォロー解除するユーザーがすでにフォローしていない場合
                return res.status(403).json("ユーザーをフォローしていません");
            }
        } else {
            // フォロー解除するユーザーが自分自身の場合
            return res
                .status(403)
                .json("自分自身をフォロー解除することはできません");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
