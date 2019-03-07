const Weather = require("../apis/Weather");

console.log(Weather);

require("dotenv").config();
const myPos = { lat: 50.083967, long: 19.899659 };
const weather = new Weather(process.env.WEATHER_API_KEY);

weather.getCurrentWeatherOnLocation(myPos)
    .then((result) => {
        console.log(result);
    });