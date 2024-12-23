import express from "express";
const app = express();
import userRouter from "./routes/users.mjs";
import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/posts.mjs";
import uploadRouter from "./routes/upload.mjs";
const PORT = 3000;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

// データベースの接続
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DBと接続中・・・"))
    .catch((err) => console.log(err));

// ミドルウェアの設定
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);

// ファイルのパスを取得
const __filename = fileURLToPath(import.meta.url); // このファイルのパス
const __dirname = path.dirname(__filename); // このファイルのディレクトリのパス

// /imagesにアクセスしたときにserver/public/imagesにアクセスするようにする
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(PORT, () =>
    console.log(`サーバーが起動しました：http://localhost:${PORT}`)
);
