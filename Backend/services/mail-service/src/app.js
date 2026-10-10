import express from "express";
import morgan from "morgan";
import mailRouter from "./routes/mail.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Mail service is running" });
});

app.use("/api/mail", mailRouter);

app.use(errorHandler);

export default app;
