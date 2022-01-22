const request = require('request')

//weather stack
const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5cdd887948c48e5c350ec070428b870e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, "It's currently " + body.current.temperature + " degrees out and it feels like " + body.current.feelslike)
        }
    })
}

module.exports = forecast