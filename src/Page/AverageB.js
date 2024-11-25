//import library dan file dari tempat lain
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue, set } from "../Firebase/FirebaseConfigReact";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";

function AverageB() {
   //declare data
    const [dataAverage, setDataAverage] = useState([]);
    const [loading, setLoading] = useState(true);
    // get average data per day function
    const getAverageData = (data) => {
        const airQualityData = {};

        Object.entries(data).forEach(([_, value]) => { // transform from object jadi array
            if (!value.Time) { // check apakah data time sudah ada atau belum
                setTimeout(() => {
                    getAverageData(data); // mencoba ulang untuk data yang sama setelah 5 detik
                }, 5000);
                return; // Keluar dari loop jika Time belum ada
            }

            const date = value.Time.split(",")[0]; // Seperate date and time by index

            if (!airQualityData[date]) { // jika belum ada tanggal itu di variable, maka declare semua value sum
                airQualityData[date] = {
                    temperatureSum: 0,
                    humiditySum: 0,
                    ppmSum: 0,
                    len: 0,
                };
            }

            //get all air quality data in float type
            const temperature = parseFloat(value.Temperature) || 0;
            const humidity = parseFloat(value.Humidity) || 0;
            const ppm = parseFloat(value.PPM) || 0;

            // Total semua data
            airQualityData[date].temperatureSum += temperature;
            airQualityData[date].humiditySum += humidity;
            airQualityData[date].ppmSum += ppm;
            airQualityData[date].len += 1;
        });
        // return result array
        return Object.entries(airQualityData).map(([date, values]) => ({ date, temperature:(values.temperatureSum/values.len).toFixed(2), humidity:(values.humiditySum/values.len).toFixed(2), ppm:(values.ppmSum/values.len).toFixed(2),}));
    };

    // Fetch firebase data
    useEffect(() => {
        const fetchData = () => {
            const dataRef = ref(db, "AirQualityMonitorB");
            const timeout = setTimeout(() => setLoading(true), 1000);
            onValue(dataRef, (snapshot) => {
                clearTimeout(timeout);
                const originData = snapshot.val();
                const averages = getAverageData(originData);
                setDataAverage(averages);
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    const fillTableData = () => { // populate table with all average data
        if (loading) { // check if data is still loading
            return (
                <tr>
                    <td colSpan="4" style={{ border: "1px solid white", padding: "8px", textAlign: "center" }}>Load data...</td>
                </tr>
            );
        }
        if (dataAverage.length > 0) {
            return dataAverage.map((dataAir, index) => (
            <tr key={index}>
                <td><a>{dataAir.date}</a></td>
                <td><a>{dataAir.temperature}</a></td>
                <td><a>{dataAir.humidity}</a></td>
                <td><a>{dataAir.ppm}</a></td>
            </tr>
            ));
        } 
        else {
            return (
            <tr>
                <td colSpan="4" style={{border: "1px solid white", padding: "8px", textAlign: "center",}}>No data</td>
            </tr>
            );
        }
    };
  
  return (
    <div class="App">
    <Heading />

    <div className="Button">
        <Link to="/BuildingB"><button type="button" class="btn btn-outline-light">Back</button></Link>
    </div>

    <div className="Table-wrap">
        <table>
            <thead>
            <tr>
              <th><a>Date</a></th>
              <th><a>Temperature</a></th>
              <th><a>Humidity</a></th>
              <th><a>PPM</a></th>
            </tr>
            </thead>
          <tbody>{fillTableData()}</tbody>
        </table>
    </div>
    <Footer />
</div> 
  );
}

export default AverageB;
