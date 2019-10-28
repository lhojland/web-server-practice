const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const port = process.env.port || 3000;

console.log('test');

// heroku


// define paths for express config
const path = require('path');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public/');

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
        title: 'About',
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
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'}
            )
     
    };
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send( {error} );
        }
        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send( {error} );
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
                })
        })
    })
    
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

app.listen(port, () => {
    console.log('Server is up on port' + port);
});