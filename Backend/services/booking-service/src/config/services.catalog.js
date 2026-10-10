/**
 * The services people can book. Single source of truth:
 * the frontend reads this list from GET /api/services.
 */
export const servicesCatalog = [
    { slug: "plumber", name: "Plumber", description: "Leaks, taps, pipes, blocked drains" },
    { slug: "electrician", name: "Electrician", description: "Wiring, switches, fans, fittings" },
    { slug: "carpenter", name: "Carpenter", description: "Furniture, doors, shelves, repairs" },
    { slug: "painter", name: "Painter", description: "Walls, ceilings, touch-ups" },
    { slug: "ac-repair", name: "AC repair", description: "Service, gas refill, installation" },
    { slug: "home-cleaning", name: "Home cleaning", description: "Kitchen, bathroom, full home" }
]

export const serviceSlugs = servicesCatalog.map((service) => service.slug)
