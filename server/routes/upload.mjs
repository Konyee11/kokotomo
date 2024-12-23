import { Router } from "express";
import multer from "multer";

const router = Router();

// multerの設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/public/images"); // 保存先
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // ファイル名
    },
});
const upload = multer({ storage });

// ファイルアップロードのエンドポイント
router.post("/", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("ファイルがアップロードされました");
    } catch (error) {
        console.log(error);
    }
});

export default router;
