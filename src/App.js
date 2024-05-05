import React, { useState, useEffect } from 'react';
import "./App.css"
import Home from "./Page/Home.js"
import Bintaro from "./Page/Bintaro.js"
import Ciledug from "./Page/Ciledug.js"
import Graha from "./Page/Graha.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route 
            path="/"
            element={
              <Home/>
            }
          />

          <Route 
            path="/Bintaro"
            element={
              <Bintaro/>
            }
          />

          <Route 
            path="/Ciledug"
            element={
              <Ciledug/>
            }
          />

          <Route 
            path="/Graha"
            element={
              <Graha/>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;