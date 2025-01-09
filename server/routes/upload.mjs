import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { Router } from "express";
import multer from "multer";
import dotenv from "dotenv";
import User from "../models/user.mjs";

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

// 環境変数のチェック
const requiredEnvVars = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_BUCKET_NAME",
];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`環境変数 ${varName} が設定されていません`);
    }
}

// multerの設定(メモリ上でファイルを扱う)
const upload = multer({
    storage: multer.memoryStorage(),
});

// 既存の古い画像を削除する関数
const deleteOldImage = async (key) => {
    if (!key) return; // 既存画像がなければ何もしない

    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };

    try {
        await s3.send(new DeleteObjectCommand(deleteParams));
        console.log(`古い画像を削除しました: ${key}`);
    } catch (error) {
        console.error("古い画像の削除に失敗しました:", error);
    }
};

// 新しい画像をアップロードする関数
const uploadNewImage = async (file, folder) => {
    // S3に保存するキーを生成
    const newKey = `${folder}/${Date.now()}_${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newKey}`;
    } catch (error) {
        console.error("新しい画像のアップロードに失敗しました:", error);
        throw new Error("画像のアップロードに失敗しました");
    }
};

// 画像アップロードエンドポイント
router.post("/", upload.single("image"), async (req, res) => {
    const { userId, folder } = req.body; // folder: "person", "cover", "post" など
    const file = req.file;

    // バリデーション: ファイルチェック
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
        // postの場合: 既存画像の削除は不要。アップロードしてURLを返すだけ。
        if (folder === "post") {
            const imageUrl = await uploadNewImage(file, folder);
            return res
                .status(200)
                .json({ message: "アップロードに成功しました", imageUrl });
        }

        // person, coverの場合: 古い画像を削除してから新しい画像をアップロード
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "ユーザーが見つかりません" });
        }

        // 古い画像のキーを取得
        let oldKey;
        if (folder === "person") {
            oldKey = user.profilePicture; // 例: S3に保存してあるキー (person/1234_filename.jpg)
        } else if (folder === "cover") {
            oldKey = user.coverPicture;
        }

        // 古い画像を削除
        await deleteOldImage(oldKey);

        // 新しい画像をアップロード (ユーザー情報の更新はここでは行わない)
        const imageUrl = await uploadNewImage(file, folder);

        return res
            .status(200)
            .json({ message: "アップロードに成功しました", imageUrl });
    } catch (error) {
        console.error("エラー:", error.message);
        return res.status(500).json({ error: "アップロードに失敗しました" });
    }
});

export default router;
