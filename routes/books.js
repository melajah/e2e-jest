const router = require('express').Router()
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/bookAuthentication');
const BookController = require("../controllers/BookController");


router.use(authorization)
router.post('/', BookController.create)
router.get('/', BookController.getAll)
router.get('/:id', authentication, BookController.getOne)
router.put('/:id', authentication, BookController.update)
router.delete('/:id', authentication, BookController.delete)

module.exports = router