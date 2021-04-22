'use strict';

require('dotenv').config();

const superagent = require('superagent');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.get('/weather', getWeatherHandler);
app.get('/movies', getMovieHandler);
app.get('/', (request, response) => {
  response.send('Weather Update');
});


async function getWeatherHandler(request, response) {

  const lat = request.query.lat;
  const lon = request.query.lon;
 
  const key = process.env.WEATHER_API_KEY;

  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

  const weatherResponse = await superagent.get(url).catch(e=> console.log('Error' , e) );

  const weatherObject = JSON.parse(weatherResponse.text);

  
  const weatherArray = weatherObject.data;
  

  const forecasts = weatherArray.map(day => new WeatherData(day));
  response.send(forecasts);
}

async function getMovieHandler(request, response) {
  const movieKey = process.env.MOVIE_API_KEY;
  const movieUrl= movieKey;

  const movieResponse = await superagent.get(movieUrl);
  const movieObject = JSON.parse(movieResponse.text);
  const movie = movieObject.results.map(movie => new Movies(movie));
  response.send(movie);

}
class WeatherData {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.title,
    this.overview = movie.overview,
    this.popularity = movie.popularity,
  }
}



app.get('*', (request, response) => {
  response.status(400,404,500).send('Error: Page not Found');
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

