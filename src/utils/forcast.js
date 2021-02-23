const request = require('request')

const forecast = (lat, long, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=dadadb863641983ffc484a7ec84200d0&query=' + long + ',' + lat + '&units=f'
    request({
        url,
        json: true
    }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + "It is currently " + body.current.temperature + " degrees out there " + " There is " + body.current.precip + "% chance of rain")
        }

    })

}

module.exports = forecast