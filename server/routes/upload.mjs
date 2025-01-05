import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Router } from "express";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

const router = Router();

// S3クライアントの作成
const s3 = new S3Client({
    region: "ap-northeast-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET_NAME
) {
    throw new Error("必要な環境変数が設定されていません");
}

// multerの設定(ローカルに一時保存)
const upload = multer({
    storage: multer.memoryStorage(),
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MBまで
});

// 画像アップロードのエンドポイント
router.post("/", upload.single("image"), async (req, res) => {
    const folder = req.body.folder;
    const file = req.file;

    if (!file) {
        return res
            .status(400)
            .json({ error: "ファイルがアップロードされていません" });
    }

    if (!file.mimetype.startsWith("image")) {
        return res
            .status(400)
            .json({ error: "画像ファイル以外はアップロードできません" });
    }

    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        return res
            .status(200)
            .json({ message: "アップロードに成功しました", imageUrl });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "アップロードに失敗しました" });
    }
});

export default router;
