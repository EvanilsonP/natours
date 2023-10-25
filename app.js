const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const userRouter = express.Router();

// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

