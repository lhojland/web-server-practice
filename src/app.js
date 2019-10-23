const express = require('express');
const app = express();
const path = require('path');

const publicDirectoryPath = path.join(__dirname, '../public/')

console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'string',
        location: 'string'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});