const axios = require("axios");
const querystring = require("querystring");

const ApiKeys = Object.freeze({
    MAIN: "http://dataservice.accuweather.com/",
    GET_LOCATION: "locations/v1/cities/geoposition/search",
    GET_WEATHER: "currentconditions/v1/"
});

class Weather {
    constructor (apiKey) {
        this.apiKey = apiKey;
    }

    async getLocationData({latitude, longitude}) {
        const query = ApiKeys.MAIN + ApiKeys.GET_LOCATION + "?" + querystring.stringify({
            apikey: this.apiKey,
            q: latitude + "," + longitude
        });

        return axios.get(query);
    }

    async getCurrentWeather(locKey) {
        const query = ApiKeys.MAIN + ApiKeys.GET_WEATHER + locKey + "?" + querystring.stringify({
            apikey: this.apiKey
        });

        return axios.get(query);
    }

    async getCurrentWeatherOnLocation(location) {
        return this.getLocationData(location)
            .then(locData => this.getCurrentWeather(locData.data.Key))
            .then((response) => {
                const data = response.data[0];
                
                return {
                    temperature: data.Temperature.Metric.Value + data.Temperature.Metric.Unit,
                    text: data.WeatherText
                };
            })
    }
}

module.exports = Weather;