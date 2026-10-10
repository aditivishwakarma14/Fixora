import http from "../../Shared/api/http";

export async function getServices() {
    const response = await http.get("/services")
    return response.data.services
}

export async function createBooking({ service, title, description, address, preferredDate }) {
    const response = await http.post("/bookings", { service, title, description, address, preferredDate })
    return response.data
}

export async function getMyBookings() {
    const response = await http.get("/bookings/mine")
    return response.data.bookings
}

export async function getOpenBookings(service) {
    const response = await http.get("/bookings/open", { params: service ? { service } : {} })
    return response.data.bookings
}

export async function acceptBooking(id) {
    const response = await http.patch(`/bookings/${id}/accept`)
    return response.data
}

export async function completeBooking(id) {
    const response = await http.patch(`/bookings/${id}/complete`)
    return response.data
}

export async function cancelBooking(id) {
    const response = await http.patch(`/bookings/${id}/cancel`)
    return response.data
}
