'use strict';

require('dotenv').config();

const superagent = require('superagent');

//Application Dependencies
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/weather', getWeatherHandler);


async function getWeatherHandler(request, response) {

  const lat = request.query.lat;
  const lon = request.query.lon;
  const key = process.env.WEATHER_API_KEY;

  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

  const weatherResponse = await superagent.get(url);

  const weatherObject = JSON.parse(weatherResponse.text);

  // console.log(weatherArray);

  const weatherArray = weatherObject.data;

  const forecasts = weatherArray.map(day => new WeatherData(day));
  response.send(forecasts);
}

class WeatherData {
  constructor(day) {
    this.forecast = day.weather.description
    this.time = day.datetime;
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

