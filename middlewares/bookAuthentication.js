const { Book } = require('../models');
module.exports = async function (req, res, next) {
    try {
        const book = await Book.findOne({
            where: {
                id: req.params.id
            }
        })
        if (book) {
            if ( book.UserId === req.userId) {
                next()
            }else{
                res.status(403).json({
                    errors: ["access forbidden"]
                })    
            }
        }else{
            res.status(400).json({
                errors: ["id book not found"]
            })
        }
    } catch (error) {
        res.status(500).json({
            errors: ["internal server error"]
        })
    }
}