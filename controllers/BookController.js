const { Book } = require('../models');
const isEmpty = require('../helpers/isEmpty');

class BookController {
    static create(req, res, next) {
        const { title, start_resolve, tag } = req.body;

        Book
            .create({
                title: title,
                start_resolve: start_resolve,
                tag: tag,
                UserId: req.userId,
                status: "doing"
            })
            .then(book => res.status(201).json(book))
            .catch(next)
    }

    static getAll(req, res, next) {
        Book
            .findAll({
                where: {
                    UserId: req.userId
                }
            })
            .then(books => {
                res.status(200).json(books)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Book
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(book => {
                res.status(200).json(book)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { 
            title, 
            tag, 
            resolved, 
            link_resolved, 
            level, 
            start_resolve,
            done_resolve,
            status
        } = req.body
        const form = {
            title: title,
            start_resolve: start_resolve,
            tag: tag,
            status: status
        }
        const validateIsEmpty = isEmpty(form)
        if (validateIsEmpty) {
            next({
                name: "SequelizeValidationError",
                errors: validateIsEmpty
            })
        }else{
            form.resolved = resolved
            form.link_resolved = link_resolved
            form.level = level
            form.done_resolve = done_resolve

            Book
                .update(form, { where: { id: req.params.id } })
                .then(() => {
                    return Book.findOne({ where: {id: req.params.id} })
                })
                .then(book => {
                    res.status(200).json(book)
                })
                .catch(next)
        }
    }
        
    static delete(req, res, next) {
        const id = req.params.id
        Book
            .destroy({ where: { id } })
            .then(() => {
                res.status(200).json({
                    id,
                    deleted: true
                })
            })
            .catch(next)
    }
}

module.exports = BookController