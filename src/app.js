const express = require('express');
const app = express();
const hbs = require('hbs');

// define paths for express config
const path = require('path');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public/');

console.log(partialsPath)

// Setup handlebars and views location
app.set('view engine', "hbs");
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Serve static pages
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Line'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Line'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Line'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'string',
        location: 'string'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Line',
        error: 'Help page not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Line',
        error: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});