const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });
};

const createTour = (req, res) => {
    
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const getTour = (req, res) => {
    // Converting a string into a number
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    });
};

const updateTour = (req, res) => {
    // If there is no ID /  Invalid ID
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    };
    
    res.status(204).json({
        status: 'success',
        data: null
    });
};

const deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Deleted successfully!'
        }
    });
};

app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.get('/api/v1/tours', getAllTours);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.listen(3000, () => console.log(`Running on PORT ${PORT}`));