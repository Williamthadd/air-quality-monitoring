import Heading from "../component/Heading.js";
import Footer from "../component/Footer.js";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div class="App info">
      <Heading />
      <div className="Button">
          <Link to="/">
              <button type="button" className="btn btn-outline-light">Back</button>
          </Link>
      </div>
      <center>
        <h1 className="info-title">Air Quality Informations</h1>
      </center>

      <div class="container text-center">
        <div class="row justify-content-evenly row align-items-center table-seperator">
          <div class="col-md-3 table-info">
            <table class="table-content">
              <tr>
                <th colspan="2">PPM (Parts per million) CO2</th>
              </tr>
              <tr>
                <td>Safe</td>
                <td>Less than 1,000</td>
              </tr>
              <tr>
                <td>Moderate</td>
                <td>1,000 - 1,500</td>
              </tr>
              <tr>
                <td>Dangerous</td>
                <td>More than 1,500</td>
              </tr>
            </table>
          </div>
          <div class="col-md-3 table-info">
            <table class="table-content">
              <tr>
                <th colspan="2">Temperature</th>
              </tr>
              <tr>
                <td>Decent</td>
                <td>23°C - 27°C</td>
              </tr>
              <tr>
                <td>Low</td>
                <td>Less than 23°C</td>
              </tr>
              <tr>
                <td>High</td>
                <td>More than 27°C</td>
              </tr>
            </table>
          </div>
          <div class="col-md-3 table-info">
            <table class="table-content">
              <tr>
                <th colspan="2">Humidity</th>
              </tr>
              <tr>
                <td>Safe</td>
                <td>30% - 70%</td>
              </tr>
              <tr>
                <td>Dry</td>
                <td>Less than 30%</td>
              </tr>
              <tr>
                <td>Moist</td>
                <td>More than 70%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PageNotFound;
