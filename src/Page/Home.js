import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      
      <Link to="/BuildingA">
        <h5>Gedung A</h5>
      </Link>

      <Link to="/BuildingB">
        <h5>Gedung B</h5>
      </Link>

      <Link to="/BuildingC">
        <h5>Gedung C</h5>
      </Link>
    </div>
  );
}

export default Home;