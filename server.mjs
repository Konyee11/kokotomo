import express from "express";
const app = express();
import usersRouter from "./routes/users.mjs";
const PORT = 3000;

// ミドルウェアの設定
app.use("/api/users", usersRouter);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
