import bookingModel from "../models/booking.model.js";

const LIST_LIMIT = 100

export async function createBooking(data) {
    return await bookingModel.create(data);
}

export async function findBookingById(id) {
    return await bookingModel.findById(id);
}

export async function findOpenBookings(service) {
    const filter = { status: "requested" }
    if (service) filter.service = service

    return await bookingModel.find(filter).sort({ createdAt: -1 }).limit(LIST_LIMIT);
}

export async function findBookingsByCustomer(customerId) {
    return await bookingModel.find({ customerId }).sort({ createdAt: -1 }).limit(LIST_LIMIT);
}

export async function findBookingsByWorker(workerId) {
    return await bookingModel.find({ workerId }).sort({ updatedAt: -1 }).limit(LIST_LIMIT);
}

/**
 * The status is part of the filter, so only one worker can win
 * when two workers accept the same job at the same time.
 */
export async function acceptBooking(id, worker) {
    return await bookingModel.findOneAndUpdate(
        { _id: id, status: "requested" },
        {
            status: "accepted",
            workerId: worker.id,
            workerName: worker.name,
            workerEmail: worker.email,
            acceptedAt: new Date()
        },
        { returnDocument: "after" }
    );
}

export async function completeBooking(id, workerId) {
    return await bookingModel.findOneAndUpdate(
        { _id: id, workerId, status: "accepted" },
        { status: "completed", completedAt: new Date() },
        { returnDocument: "after" }
    );
}

export async function cancelBooking(id, customerId) {
    return await bookingModel.findOneAndUpdate(
        { _id: id, customerId, status: { $in: [ "requested", "accepted" ] } },
        { status: "cancelled", cancelledAt: new Date() },
        { returnDocument: "after" }
    );
}
