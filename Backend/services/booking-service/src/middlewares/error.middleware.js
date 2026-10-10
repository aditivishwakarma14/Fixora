export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    if (!err.statusCode) {
        console.log(err)
    }

    // invalid ObjectId in the url
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id", success: false })
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: Object.values(err.errors)[ 0 ].message, success: false })
    }

    res.status(statusCode).json({
        message: err.statusCode ? err.message : "Internal Server error",
        success: false
    })
}
