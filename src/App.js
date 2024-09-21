import React from 'react';
import "../src/Style/App.css"
import Home from "./Page/Home.js"
import BuildingA from "./Page/BuildingA.js"
import BuildingB from "./Page/BuildingB.js"
import BuildingC from "./Page/BuildingC.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route 
            path="/"
            element={
              <BuildingA/>
            }
          />

          <Route 
            path="/BuildingB"
            element={
              <BuildingB/>
            }
          />

          <Route 
            path="/BuildingC"
            element={
              <BuildingC/>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;