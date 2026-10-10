import { servicesCatalog } from "../config/services.catalog.js";
import {
    acceptBookingService,
    cancelBookingService,
    completeBookingService,
    createBookingService,
    getBookingService,
    listMyBookingsService,
    listOpenBookingsService
} from "../services/booking.service.js";


export const listServices = (_req, res) => {
    res.status(200).json({ message: "Services fetched successfully", success: true, services: servicesCatalog })
}

export const createBooking = async (req, res) => {
    const { service, title, description, address, preferredDate } = req.body

    const booking = await createBookingService(req.user, { service, title, description, address, preferredDate })

    res.status(201).json({ message: "Request posted successfully", success: true, booking })
}

export const listMyBookings = async (req, res) => {
    const bookings = await listMyBookingsService(req.user)

    res.status(200).json({ message: "Bookings fetched successfully", success: true, bookings })
}

export const listOpenBookings = async (req, res) => {
    const bookings = await listOpenBookingsService(req.query.service)

    res.status(200).json({ message: "Open jobs fetched successfully", success: true, bookings })
}

export const getBooking = async (req, res) => {
    const booking = await getBookingService(req.user, req.params.id)

    res.status(200).json({ message: "Booking fetched successfully", success: true, booking })
}

export const acceptBooking = async (req, res) => {
    const booking = await acceptBookingService(req.user, req.params.id)

    res.status(200).json({ message: "Job accepted", success: true, booking })
}

export const completeBooking = async (req, res) => {
    const booking = await completeBookingService(req.user, req.params.id)

    res.status(200).json({ message: "Job marked as completed", success: true, booking })
}

export const cancelBooking = async (req, res) => {
    const booking = await cancelBookingService(req.user, req.params.id)

    res.status(200).json({ message: "Request cancelled", success: true, booking })
}
