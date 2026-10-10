export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    // log unexpected errors only (AppError always has a statusCode)
    if (!err.statusCode) {
        console.log(err)
    }

    // duplicate key (e.g. email already exists)
    if (err.code === 11000) {
        return res.status(409).json({ message: "Email already registered", success: false })
    }

    res.status(statusCode).json({
        message: err.statusCode ? err.message : "Internal Server error",
        success: false
    })
}
