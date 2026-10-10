import mongoose from "mongoose";
import { serviceSlugs } from "../config/services.catalog.js";

export const BOOKING_STATUS = [ "requested", "accepted", "completed", "cancelled" ]

const bookingSchema = new mongoose.Schema({
    service: { type: String, required: true, enum: serviceSlugs },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    preferredDate: { type: Date },

    status: { type: String, enum: BOOKING_STATUS, default: "requested" },

    // the user who asked for the job
    customerId: { type: String, required: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },

    // the worker who accepted it
    workerId: { type: String, index: true },
    workerName: { type: String },
    workerEmail: { type: String },

    acceptedAt: { type: Date },
    completedAt: { type: Date },
    cancelledAt: { type: Date }
}, { timestamps: true })

bookingSchema.index({ status: 1, service: 1, createdAt: -1 })

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;
