import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// the api-gateway forwards the real client ip in x-forwarded-for
app.set("trust proxy", 1);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Auth service is running" });
});

app.use("/", authRouter);

app.use(errorHandler);

export default app;
