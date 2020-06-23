const jwt = require('jsonwebtoken');
const { User } = require('../models');
module.exports = async function (req, res, next) {  
    if (req.headers.hasOwnProperty('authorization') && req.headers.authorization) {
        const token = req.headers.authorization
        try {
            const decode = jwt.verify(token, 'secret')
            const user = await User.findOne({ where: { id: decode.userId } })
            if (user) {
                req.userId = user.id
                next()   
            }else{
                res.status(400).json({
                    errors: ['your account was deleted']
                })
            }
        } catch (error) {
            res.status(400).json({
                errors: ['token is not valid']
            })
        }
    }else{
        res.status(400).json({
            errors: ["header authorization is required"]
        })
    }
}