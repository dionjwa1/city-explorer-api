'use strict';

const express = require('express');
require('data/weather.json).config();
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listneing on ${PORT}`));
