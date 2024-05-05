import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Ciledug() {
  return (
    <div>
      <h1>Ciledug</h1>

      <Link to="/">
        <h5>Back to Home</h5>
      </Link>
    </div>
  );
}

export default Ciledug;