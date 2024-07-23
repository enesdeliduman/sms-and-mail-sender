module.exports.ErrorHandler = async (err, req, res, next) => {
    let status = 500;
    console.log(err)
    let errorMessage = err.message || 'Internal Server Error';
    if (err.name == "SequelizeUniqueConstraintError") {
        status = 409;
    }
    return res.status(status).json({ success: false, message: errorMessage });
}
