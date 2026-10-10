import express from "express";
import morgan from "morgan";
import bookingRouter from "./routes/booking.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Booking service is running" });
});

app.use("/", bookingRouter);

app.use((_req, res) => {
    res.status(404).json({ message: "Route not found", success: false })
})

app.use(errorHandler);

export default app;
