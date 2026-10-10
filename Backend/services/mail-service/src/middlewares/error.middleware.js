export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    console.log(err.message)

    res.status(statusCode).json({
        message: err.statusCode ? err.message : "Internal Server error",
        success: false
    })
}
