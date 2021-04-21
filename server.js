'use strict';

const express = require('express');
const activate = require('./data/weather.json');
console.log(activate);
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listneing on ${PORT}`));

app.get('/weather', (request, response) => {
// const lat = request.query.lat;
// const lon = request.query.lon;

  const newArray = [];
  for (let i = 0; i < activate.data.length; i++) {
    const allData = new Data(activate.data[i].datetime, activate.data[i].weather.description)


    newArray.push(allData)

  }

  // app.get('/weather', (request, response) => {
  response.status(200).json(newArray);
});

function Data(date, description) {
  this.date = date;
  this.description = description;

};
