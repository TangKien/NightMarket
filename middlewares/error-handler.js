const errorHandler = (err, req, res, next) => {
    const statusCode = 200 ? 500 : err.statusCode;
    res.status(statusCode).json({ err: err.message });
}

module.exports = errorHandler;