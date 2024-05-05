import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Home</h1>
      
      <Link to="/Bintaro">
        <h5>Bintaro</h5>
      </Link>

      <Link to="/Ciledug">
        <h5>Ciledug</h5>
      </Link>

      <Link to="/Graha">
        <h5>Graha</h5>
      </Link>
    </div>
  );
}

export default App;