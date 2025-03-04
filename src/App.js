import React from 'react';
import "../src/Style/App.css"
import BuildingA from "./Page/BuildingA.js"
import BuildingB from "./Page/BuildingB.js"
import BuildingC from "./Page/BuildingC.js"
import ChartA from "./Page/ChartA.js"
import ChartB from "./Page/ChartB.js"
import ChartC from "./Page/ChartC.js"
import About from "./Page/About.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// last updated 02/19/2025 12:51
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
            path="/ChartA"
            element={
              <ChartA/>
            }
          />

          <Route 
            path="/ChartB"
            element={
              <ChartB/>
            }
          />

          <Route 
            path="/ChartC"
            element={
              <ChartC/>
            }
          />

          <Route 
            path="/About"
            element={
              <About/>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;