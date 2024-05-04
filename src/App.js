// Client (React.js)
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Data Monitoring Kualitas Udara</h1>
      <p>Temperature: {data.temperature}</p>
      <p>Humidity: {data.humidity}</p>
      <p>AQI: {data.aqi}</p>
    </div>
  );
}

export default App;