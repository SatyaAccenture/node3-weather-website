const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')
console.log(__dirname)
console.log(path.join(__dirname, '..'))
console.log(path.join(__dirname, '../..'))
console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Satyabati Goswami'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Satyabati Goswami'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Satyabati Goswami'
    })
})
//this is for /help path. localhost:3000/help
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Ana',
//         age: 26
//     }
//     ])
// })

// //about route
// app.get('/about', (req, res) => {
//     res.send('<title>About info </title>')
// })

//weather route
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide an location'
        })

    }
    let location = req.query.location
    geocode.geocode(location, (error, { longitute, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forcast(longitute, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forcast: data,
                location,
                address: req.query.location
            });
        })
    })
})
app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})
//generic  error page
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Can not find help',
        title: '404',
        name: 'Satyabati Goswami'
    })
})
//generic  error page
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Satyabati Goswami'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
