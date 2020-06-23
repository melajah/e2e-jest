const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const auth = require('./auth');
const books = require('./books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("hello world")
});

router.use('/auth', auth)
router.use('/books', books)

router.use(errorHandler)
module.exports = router;