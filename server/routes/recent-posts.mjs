import { Router } from "express";
import Post from "../models/post.mjs";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(recentPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
