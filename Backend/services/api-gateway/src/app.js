import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import { bookingServiceProxy, healthCheck } from "./controllers/gateway.controller.js";
import { removeUserHeader } from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { config } from "./config/config.js";

const app = express();

// number of proxy hops in front of the gateway (Render adds one)
app.set("trust proxy", Number(process.env.TRUST_PROXY) || 1);

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: config.FRONTEND_URL,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS" ],
    credentials: true
}))
app.use(removeUserHeader);

// body is not parsed here, it is streamed to the services

app.get("/", healthCheck);
app.get("/health", healthCheck);

app.use("/api/auth", authRouter);

// public: list of services people can book
app.use("/api/services", bookingServiceProxy);

// private: create, list, accept, complete and cancel bookings
app.use("/api/bookings", bookingRouter);

app.use((_req, res) => {
    res.status(404).json({ message: "Route not found", success: false })
})

app.use(errorHandler);

export default app;