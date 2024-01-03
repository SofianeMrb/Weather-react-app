import { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import './App.css'


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'fb312ad4acdc44605548812e78dbc740';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };
  return (
    <Container className="container">
      <Paper elevation={3} className="card">
        <Typography variant="h1" className="title">
          Weather
        </Typography>
        <div className="input-container">
          <TextField
            className="input"
            label="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button className="button" variant="contained" onClick={fetchWeather}>
            Get Weather
          </Button>
        </div>
        {error && <Typography className="error-message">{error}</Typography>}
        {weather && (
          <div className="weather-info">
            <Typography variant="h2">
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography>Temperature: {weather.main.temp} °C</Typography>
            <Typography>Weather: {weather.weather[0].description}</Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
  
}

export default App
