const dotenv = require('dotenv');
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');

const app = express();

// Keep-alive endpoint for UptimeRobot
app.get('/ping', (req, res) => {
    res.json({ status: 'alive' });
});


dotenv.config();

app.use(cors());

const port = process.env.PORT || 5000;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;

  const url = lat && lon
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${city || 'Toronto'}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching weather data'
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on ${process.env.PORT ? `http://localhost:${port}` : 'Live Render URL'}`);
});