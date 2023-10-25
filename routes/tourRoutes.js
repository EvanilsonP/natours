// const tourRouter = express.Router();
const express = require('express');
const app = express();

app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.get('/api/v1/tours', getAllTours);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;