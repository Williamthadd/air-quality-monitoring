//import library dan file dari tempat lain
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue } from "../Firebase/FirebaseConfigReact";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";

function BuildingA() {
  //declare data
  const [data, setData] = useState(null);

  // handle perubahan jika ada
  useEffect(() => {
    const fetchData = () => {
      //ambil data AirQualityMonitor dari realtime database AirQualityMonitorBintaro di firebase
      const dataRef = ref(db, "AirQualityMonitorA");
      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        // Mendapatkan kunci terbaru dari objek data
        const latestKey = Object.keys(newData)[Object.keys(newData).length - 1];
        // Mendapatkan data terbaru berdasarkan kunci
        const latestData = newData[latestKey];
        // Add current time in WIB format
        const now = new Date();
        const wibTime = now.toLocaleString('en-GB', {
          timeZone: 'Asia/Jakarta',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(',', '');
        latestData.Time = wibTime;
        // Menyimpan data terbaru ke dalam state
        setData(latestData);
      });
    };

    //memastikan permintaan ke firebase hanya dilakukan sekali
    fetchData();

    return () => {
      // bersihkan data agar tidak ada yg double
    };
  }, []);

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
    if (dataPPM > 100) {
      return (
        <div className="Card4">
          <h1>High</h1>
        </div>
      );
    } else if (dataPPM >= 50 && dataPPM <= 100) {
      return (
        <div className="Card5">
          <h1>Medium</h1>
        </div>
      );
    } else {
      return (
        <div className="Card6">
          <h1>Safe</h1>
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
      <br></br>

      {data && (
        <div>
          <div className="DropDown">
            <h1>Binus Alam Sutera</h1>

            <div class="btn-group">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                Building A
              </button>
              <ul class="dropdown-menu">
                <Link to="/BuildingB" className="Link">
                  <li className="libutton">
                    <button class="dropdown-item" type="button">
                      Building B
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
        </div>
      )}
      <Footer />
    </div>
  );
}

export default BuildingA;