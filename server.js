// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Ensure the path module is required
const app = express();
const port = 8000;

// Allow CORS for local development
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Replace with your actual API key
const apiKey = '4a7fac165493080c7bf3c7464156c980';
const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={lon}&date={date}&appid={API key}';

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
