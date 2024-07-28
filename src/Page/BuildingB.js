import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BuildingB() {
  return (
    <div>
      <h1>Gedung B</h1>

      <Link to="/">
        <h5>Back to Home</h5>
      </Link>
    </div>
  );
}

export default BuildingB;