import React from 'react';
import "../src/Style/App.css"
import BuildingA from "./Page/Building/BuildingA.js"
import BuildingB from "./Page/Building/BuildingB.js"
import BuildingC from "./Page/Building/BuildingC.js"
import ChartA from "./Page/History/ChartA.js"
import ChartB from "./Page/History/ChartB.js"
import ChartC from "./Page/History/ChartC.js"
import About from "./Page/Others/About.js"
import PageNotFound from "./Page/Others/PageNotFound.js"
import Information from "./Page/Others/Information.js"
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

          <Route 
            path="*"
            element={
              <PageNotFound/>
            }
          />

          <Route 
            path="/Information"
            element={
              <Information/>
            }
          />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
