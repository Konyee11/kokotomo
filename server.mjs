import express from "express";
const app = express();
import userRouter from "./routes/users.mjs";
import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/posts.mjs";
const PORT = 3000;

// ミドルウェアの設定
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
