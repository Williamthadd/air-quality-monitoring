import React from 'react';
import "../src/Style/App.css"
import BuildingA from "./Page/BuildingA.js"
import BuildingB from "./Page/BuildingB.js"
import BuildingC from "./Page/BuildingC.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// last updated 11/03/2024 19:21
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