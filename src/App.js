import React from 'react';
import "../src/Style/App.css"
import BuildingA from "./Page/BuildingA.js"
import BuildingB from "./Page/BuildingB.js"
import BuildingC from "./Page/BuildingC.js"
import AverageA from "./Page/AverageA.js"
import AverageB from "./Page/AverageB.js"
import AverageC from "./Page/AverageC.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// last updated 11/28/2024 12:51
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

          <Route 
            path="/AverageA"
            element={
              <AverageA/>
            }
          />

          <Route 
            path="/AverageB"
            element={
              <AverageB/>
            }
          />

          <Route 
            path="/AverageC"
            element={
              <AverageC/>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;