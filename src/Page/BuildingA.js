//import library dan file dari tempat lain
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue, set } from "../Firebase/FirebaseConfigReact";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";

function BuildingA() {
  //declare data
  const [data, setData] = useState(null);

  // handle perubahan jika ada
  useEffect(() => {
    const fetchData = () => {
      // Ambil data AirQualityMonitor dari Realtime Database
      const dataRef = ref(db, "AirQualityMonitorA");
      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();

        if (newData) {
          // Mendapatkan kunci terbaru
          const latestKey = Object.keys(newData)[Object.keys(newData).length - 1];
          const latestData = newData[latestKey];

          // Tambahkan waktu saat ini dalam format WIB
          const now = new Date();
          const wibTime = now.toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });;

          // Create a new object with the latest data and updated time
          const updatedData = {
            ...latestData,
            Time: wibTime
          };

          // Simpan kembali data terbaru ke Firebase
          const latestRef = ref(db, `AirQualityMonitorA/${latestKey}`);
          set(latestRef, updatedData);

          // Update local state with the new data
          setData(updatedData);
        }
      });
    };

    // Memastikan permintaan ke Firebase hanya dilakukan sekali
    fetchData();

    return () => {
      // Bersihkan event listener jika diperlukan
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