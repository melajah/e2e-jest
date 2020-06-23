if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'test') 
    require('dotenv').config()

const express = require('express');
const indexRouter = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
// app.listen(3000, () => console.log('listening app by port: 3000'))

module.exports = app;
