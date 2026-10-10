import express from "express";
import morgan from "morgan";
import bookingRouter from "./routes/booking.routes.js";
import { requireGateway } from "./middlewares/gateway.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Render/any proxy sits in front, number of proxy hops to trust
app.set("trust proxy", Number(process.env.TRUST_PROXY) || 1);

app.use(morgan("dev"));
app.use(requireGateway);
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Booking service is running" });
});

app.use("/", bookingRouter);

app.use((_req, res) => {
    res.status(404).json({ message: "Route not found", success: false })
})

app.use(errorHandler);

export default app;