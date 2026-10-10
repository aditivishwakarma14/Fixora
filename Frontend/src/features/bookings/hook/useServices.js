import { useEffect, useState } from "react";
import { getServices } from "../service/booking.api";

// shown while loading or if the booking-service is down
export const fallbackServices = [
    { slug: "plumber", name: "Plumber", description: "Leaks, taps, pipes, blocked drains" },
    { slug: "electrician", name: "Electrician", description: "Wiring, switches, fans, fittings" },
    { slug: "carpenter", name: "Carpenter", description: "Furniture, doors, shelves, repairs" },
    { slug: "painter", name: "Painter", description: "Walls, ceilings, touch-ups" },
    { slug: "ac-repair", name: "AC repair", description: "Service, gas refill, installation" },
    { slug: "home-cleaning", name: "Home cleaning", description: "Kitchen, bathroom, full home" },
]

export const useServices = () => {
    const [ services, setServices ] = useState(fallbackServices)

    useEffect(() => {
        let ignore = false

        getServices()
            .then((list) => { if (!ignore && list?.length) setServices(list) })
            .catch(() => { /* keep the fallback list */ })

        return () => { ignore = true }
    }, [])

    return services
}
