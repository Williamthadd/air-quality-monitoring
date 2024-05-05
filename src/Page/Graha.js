import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Graha() {
  return (
    <div>
      <h1>Graha</h1>

      <Link to="/">
        <h5>Back to Home</h5>
      </Link>
    </div>
  );
}

export default Graha;