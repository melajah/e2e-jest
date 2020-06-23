module.exports = function (err, req, res, next) {
    // console.log(err, '<<<<<<<<<<<<<<')
    const errors = []
    let status = 500
    switch (err.name) {
        case "SequelizeValidationError":
            err.errors.forEach(val => {
                errors.push(val.message)
            });
            status = 400
            break;
        default:
            errors.push("internal server error")
            break;
    }

    res.status(status).json({
        errors
    })
}