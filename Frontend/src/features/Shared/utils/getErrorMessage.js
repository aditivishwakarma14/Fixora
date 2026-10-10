import axios from "axios";

// readable message from an API error
export const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "Cannot reach the server. Please check that the backend is running."
        }
        return error.response.data?.message || "Something went wrong"
    }
    return "Something went wrong"
}
