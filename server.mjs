import express from "express";
const app = express();
import userRouter from "./routes/users.mjs";
import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/posts.mjs";
const PORT = 3000;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

app.listen(PORT, () =>
    console.log(`サーバーが起動しました：http://localhost:${PORT}`)
);
