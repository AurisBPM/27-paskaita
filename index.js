const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

server.get('/places', async (_, res) => {
  try {
    const request = await fetch('https://api.meteo.lt/v1/places');
    const data = await request.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

server.get('/places/:cityCode/forecasts', async (req, res) => {
  const cityCode = req.params.cityCode;
  try {
    const request = await fetch(`https://api.meteo.lt/v1/places/${cityCode}/forecasts`);
    const data = await request.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

server.get('/places/:cityCode/forecasts/:forecastType', async (req, res) => {
  const cityCode = req.params.cityCode;
  const forecastType = req.params.forecastType;
  console.log(forecastType);
  try {
    const request = await fetch(`https://api.meteo.lt/v1/places/${cityCode}/forecasts/${forecastType}`);
    const data = await request.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

server.listen(8080, () => console.log('Server runs on port 8080'));
