'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const getWeatherHandler = require('./components/weather.js');
const getMovieHandler = require('./components/movies.js');

const app = express();
app.use(cors());
app.get('/weather', getWeatherHandler);
app.get('/movies', getMovieHandler);
app.get('/', (request, response) => {
  response.send('Weather Update');
});

app.get('*', (request, response) => {
  response.status(400, 404, 500).send('Error: Page not Found');
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

