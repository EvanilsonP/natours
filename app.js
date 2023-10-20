const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(404).json({ message: "Hello from the server!"});
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint!');
});

app.listen(3000, () => console.log(`Running on PORT ${PORT}`));