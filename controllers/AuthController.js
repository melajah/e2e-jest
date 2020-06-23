const { User } = require('../models');
const jwt = require('jsonwebtoken');
const isEmpty = require('../helpers/isEmpty');
const { checkPassword } = require('../helpers/bcrypt');

class AuthController {

    static register(req, res, next) {
        const { name, email, password } = req.body
        User
            .create({
                name,
                email,
                password
            })
            .then(user => {
                const token = jwt.sign({ 
                    userId: user.id
                }, "secret")

                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        const validateIsEmpty = isEmpty({
            email: email,
            password: password
        })
        if (validateIsEmpty) {
            next({
                name: "SequelizeValidationError",
                errors: validateIsEmpty
            })
        }else {
            User
                .findOne({
                    where: { email }
                })
                .then(user => {
                    const errors = {
                        name: "SequelizeValidationError",
                        errors: [
                            {
                                message: "Email/Password incorrect"
                            }
                        ]
                    }
                    if(user) {
                        const isPassword = checkPassword(password, user.password)
                        if (isPassword) {
                            const token = jwt.sign({ 
                                userId: user.id
                            }, "secret")
            
                            res.status(200).json({
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                token
                            })
                        }else{
                            next(errors)
                        }
                    }else{
                        next(errors)
                    }
                })
                .catch(next)
        }
    }
}

module.exports = AuthController