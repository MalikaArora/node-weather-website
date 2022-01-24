//nodemon src/app.js -e js,hbs

const path = require('path')
const express = require('express') //just a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Malika Arora'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Malika Arora'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Malika Arora'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please send an address'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //destructuring data into lati, longi. locn
        if (error) {
            return res.send({
                error //error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'Help article not found',
        title: '404',
        name: 'Malika Arora'
    })
})

app.get('*', (req, res) => { //wildcard charecter
    res.render('404', {
        errorText: 'My 404 page',
        title: '404',
        name: 'Malika Arora'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})
