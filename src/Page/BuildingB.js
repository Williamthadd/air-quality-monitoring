//import library dan file dari tempat lain
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue } from "../Firebase/FirebaseConfigReact";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";

function BuildingB() {
  //declare data
  const [data, setData] = useState(null);

  // handle perubahan jika ada
  useEffect(() => {
    const fetchData = () => {
      //ambil data AirQualityMonitor dari realtime database AirQualityMonitorBintaro di firebase
      const dataRef = ref(db, "AirQualityMonitorB");
      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        const dataArray = Object.values(newData);
        const totalEntries = dataArray.length;

        // get data untuk average setiap air quality parameter
        const ppmData = dataArray.slice(Math.max(totalEntries - 33, 0)); // ambil 33 data terakhir
        const humidityData = dataArray.slice(Math.max(totalEntries - 25, 0)); //  ambil 25 data terakhir
        const temperatureData = dataArray.slice(Math.max(totalEntries - 17, 0)); // ambil 17 data terakhir

        // rata-rata setiap air quality parameter
        const averagePPM = calculateAverage(ppmData.map(item => parseFloat(item.PPM) || 0));
        const averageHumidity = calculateAverage(humidityData.map(item => parseFloat(item.Humidity) || 0));
        const averageTemperature = calculateAverage(temperatureData.map(item => parseFloat(item.Temperature) || 0));

        // Get the latest timestamp
        const latestData = dataArray[dataArray.length - 1];

        // set updated data
        setData({
          PPM: parseFloat(averagePPM.toFixed(2)),
          Humidity: parseFloat(averageHumidity.toFixed(2)),
          Temperature: parseFloat(averageTemperature.toFixed(2)),
          Time: latestData.Time
        });
      });
    };

    //memastikan permintaan ke firebase hanya dilakukan sekali
    fetchData();

    return () => {
      // bersihkan data agar tidak ada yg double
    };
  }, []);

  // 
  const calculateAverage = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length;
  };

  function TemperatureConverter({ dataTemperature }) {
    if (dataTemperature > 27) {
      return (
        <div className="Card4">
          <h1>Hot</h1>
        </div>
      );
    } else if (dataTemperature > 23) {
      return (
        <div className="Card6">
          <h1>Decent</h1>
        </div>
      );
    } else {
      return (
        <div className="Card7">
          <h1>Low</h1>
        </div>
      );
    }
  }

  function PPMConveter({ dataPPM }) {
    if (dataPPM < 1000) {
      return (
        <div className="Card6">
          <h1>Safe</h1>
        </div>
      );
    } else if (dataPPM >= 1000 && dataPPM <= 1500) {
      return (
        <div className="Card5">
          <h1>Moderate</h1>
        </div>
      );
    } else {
      return (
        <div className="Card4">
          <h1>Dangerous</h1>
        </div>
      );
    }
  }

  function HumidityConverter({ dataHumidity }) {
    if (dataHumidity > 70) {
      return (
        <div className="Card4">
          <h1>Dangerous</h1>
        </div>
      );
    } else if (dataHumidity > 23) {
      return (
        <div className="Card6">
          <h1>Safe</h1>
        </div>
      );
    } else {
      return (
        <div className="Card5">
          <h1>Dry</h1>
        </div>
      );
    }
  }

  return (
    <div class="App">
      <Heading />
      <br />

      {data && (
        <div>
          <div className="DropDown">
            <h1>Classroom B</h1>

            <div class="btn-group">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                Building B
              </button>
              <ul class="dropdown-menu">
                <Link to="/" className="Link">
                  <li className="libutton">
                    <button class="dropdown-item" type="button">
                      Building A
                    </button>
                  </li>
                </Link>
                <Link to="/BuildingC">
                  <li className="libutton">
                    <button class="dropdown-item" type="button">
                      Building C
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className="middle-wrapper">
            <div className="Card">
              <div className="Card2">
                <h1>PPM CO2</h1>
              </div>

              <div className="Card3-Wrapper">
                <div className="Card3">
                  <h1>{data.PPM}</h1>
                </div>

                <PPMConveter dataPPM={data.PPM} />
              </div>
            </div>

            <div className="Card">
              <div className="Card2">
                <h1>Temperature {"(°C)"} </h1>
              </div>

              <div className="Card3-Wrapper">
                <div className="Card3">
                  <h1>{data.Temperature}</h1>
                </div>

                <TemperatureConverter dataTemperature={data.Temperature} />
              </div>
            </div>

            <div className="Card">
              <div className="Card2">
                <h1>Humidity {"(%)"}</h1>
              </div>

              <div className="Card3-Wrapper">
                <div className="Card3">
                  <h1>{data.Humidity}</h1>
                </div>

                <HumidityConverter dataHumidity={data.Humidity} />
              </div>
            </div>
          </div>
          <p className="Time">
            <b>Last updated : </b> {data.Time}{" "}
          </p>

          <div className="Button1">
            <Link to="/ChartB">
              <button type="button" class="btn btn-outline-light">
                History Building B
              </button>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
export default BuildingB;
