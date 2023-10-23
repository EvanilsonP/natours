const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

// app.get('/', (req, res) => {
//     res.status(404).json({ message: "Hello from the server!"});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint.');
// });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });
});

app.listen(3000, () => console.log(`Running on PORT ${PORT}`));