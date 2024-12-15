import { Router } from "express";
const router = Router();
import Post from "../models/post.mjs";

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

export default router;
