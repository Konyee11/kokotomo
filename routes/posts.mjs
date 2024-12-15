import { Router } from "express";
const router = Router();
import Post from "../models/post.mjs";

// 特定の投稿の取得
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 投稿の作成
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 投稿の更新
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿が更新されました");
        } else {
            return res.status(403).json("投稿者のみ編集可能です");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// 投稿の削除
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("投稿が削除されました");
        } else {
            return res.status(403).json("投稿者のみ削除可能です");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// 投稿のいいね
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            // まだいいねが押されていない場合
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("いいねしました");
        } else {
            // すでにいいねが押されている場合
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("いいねを取り消しました");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
