export const errorHandler = (err, req, res, next) => {
    console.log(err)

    res.status(err.statusCode || 500).json({
        message: err.statusCode ? err.message : "Internal Server error",
        success: false
    })
}
