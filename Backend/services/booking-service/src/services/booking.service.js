import { AppError } from "../utils/AppError.js";
import {
    acceptBooking,
    cancelBooking,
    completeBooking,
    createBooking,
    findBookingById,
    findBookingsByCustomer,
    findBookingsByWorker,
    findOpenBookings
} from "../dao/booking.dao.js";
import { sendMail } from "./mail.service.js";
import {
    bookingAcceptedTemplate,
    bookingCancelledTemplate,
    bookingCompletedTemplate
} from "../utils/booking.template.js";


function toBooking(booking) {
    return {
        id: booking._id,
        service: booking.service,
        title: booking.title,
        description: booking.description,
        address: booking.address,
        preferredDate: booking.preferredDate || null,
        status: booking.status,
        customer: { id: booking.customerId, name: booking.customerName },
        worker: booking.workerId ? { id: booking.workerId, name: booking.workerName } : null,
        acceptedAt: booking.acceptedAt || null,
        completedAt: booking.completedAt || null,
        cancelledAt: booking.cancelledAt || null,
        createdAt: booking.createdAt
    }
}

/**
 * Called when an update did not match: find out why,
 * so the person gets a clear message instead of a vague one.
 */
async function explainFailure(id, message) {
    const booking = await findBookingById(id)

    if (!booking) {
        throw new AppError("Booking not found", 404)
    }

    throw new AppError(message, 409)
}


export async function createBookingService(user, data) {
    const booking = await createBooking({
        service: data.service,
        title: data.title,
        description: data.description,
        address: data.address,
        preferredDate: data.preferredDate || undefined,
        customerId: user.userId,
        customerName: user.fullName,
        customerEmail: user.email
    })

    return toBooking(booking)
}

export async function listMyBookingsService(user) {
    const bookings = user.role === "Worker"
        ? await findBookingsByWorker(user.userId)
        : await findBookingsByCustomer(user.userId)

    return bookings.map(toBooking)
}

export async function listOpenBookingsService(service) {
    const bookings = await findOpenBookings(service)

    return bookings.map(toBooking)
}

export async function getBookingService(user, id) {
    const booking = await findBookingById(id)

    if (!booking) {
        throw new AppError("Booking not found", 404)
    }

    const isCustomer = booking.customerId === user.userId
    const isWorker = booking.workerId === user.userId
    // workers can look at jobs that are still open
    const isOpenForWorker = user.role === "Worker" && booking.status === "requested"

    if (!isCustomer && !isWorker && !isOpenForWorker) {
        throw new AppError("You cannot view this booking", 403)
    }

    return toBooking(booking)
}

export async function acceptBookingService(user, id) {
    const booking = await acceptBooking(id, {
        id: user.userId,
        name: user.fullName,
        email: user.email
    })

    if (!booking) {
        return await explainFailure(id, "This job is no longer available")
    }

    sendMail({
        to: booking.customerEmail,
        subject: "Your Fixora request was accepted",
        html: bookingAcceptedTemplate(booking)
    })

    return toBooking(booking)
}

export async function completeBookingService(user, id) {
    const booking = await completeBooking(id, user.userId)

    if (!booking) {
        return await explainFailure(id, "Only the worker who accepted an active job can complete it")
    }

    sendMail({
        to: booking.customerEmail,
        subject: "Your Fixora job is complete",
        html: bookingCompletedTemplate(booking)
    })

    return toBooking(booking)
}

export async function cancelBookingService(user, id) {
    const booking = await cancelBooking(id, user.userId)

    if (!booking) {
        return await explainFailure(id, "Only your own requested or accepted jobs can be cancelled")
    }

    if (booking.workerEmail) {
        sendMail({
            to: booking.workerEmail,
            subject: "A Fixora job was cancelled",
            html: bookingCancelledTemplate(booking)
        })
    }

    return toBooking(booking)
}
