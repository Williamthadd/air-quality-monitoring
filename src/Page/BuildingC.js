//import library dan file dari tempat lain
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, ref, onValue } from '../Firebase/FirebaseConfigReact';

function BuildingC() {
    //declare data
    const [data, setData] = useState(null);

    // handle perubahan jika ada
    useEffect(() => {
        const fetchData = () => {
        //ambil data AirQualityMonitor dari realtime database AirQualityMonitorBintaro di firebase
        const dataRef = ref(db, 'AirQualityMonitorC');
        onValue(dataRef, (snapshot) => {
            const newData = snapshot.val();
            // Mendapatkan kunci terbaru dari objek data
            const latestKey = Object.keys(newData)[Object.keys(newData).length - 1];
            // Mendapatkan data terbaru berdasarkan kunci
            const latestData = newData[latestKey];
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

    //output interface
    return (
        <div>
        <h1>Gedung C</h1>
        {data && (
            <div>
            <p>Time: {data.Time}</p>
            <p>Temperature: {data.Temperature}</p>
            <p>Humidity: {data.Humidity}</p>
            <p>PPM CO2: {data.PPM}</p>
            <p>Message: {data.Message}</p>
            </div>
        )}
        <Link to="/">
            <h5>Back to Home</h5>
        </Link>
        </div>
    );
}

export default BuildingC;