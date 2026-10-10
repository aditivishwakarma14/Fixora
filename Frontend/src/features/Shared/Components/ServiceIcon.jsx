import { FaBolt, FaBroom, FaHammer, FaPaintRoller, FaSnowflake, FaTools, FaWrench } from "react-icons/fa";

const icons = {
    plumber: FaWrench,
    electrician: FaBolt,
    carpenter: FaHammer,
    painter: FaPaintRoller,
    "ac-repair": FaSnowflake,
    "home-cleaning": FaBroom,
}

const ServiceIcon = ({ slug, className = "" }) => {
    const Icon = icons[ slug ] || FaTools
    return <Icon className={className} aria-hidden="true" />
}

export default ServiceIcon
