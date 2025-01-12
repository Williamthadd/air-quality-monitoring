//import library dan file dari tempat lain
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue } from "../Firebase/FirebaseConfigReact.js";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function ChartC() {
    // declare state
    const [dataAverage, setDataAverage] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAverageData = (data) => {
        const today = new Date();
        //convert date ke string
        const todayStr = today.toLocaleDateString();
        
        const timeGroups = {};
        
        // iterate setiap date
        Object.entries(data).forEach(([_, value]) => {
            // prevent waktu kosong
            if (!value.Time) {
                setTimeout(() => {
                    getAverageData(data);
                }, 5000);
                return;
            }
            
            // seperate date & time
            const [datePart, timePart] = value.Time.split(", ");
            // seperate date, month, nand year
            const [day, month, year] = datePart.split('/');
            // convert ke string
            const dateStr = `${month}/${day}/${year}`;
            
            // lewati jika bukan data hari ini
            if (dateStr !== todayStr) return;
            
            // menghitung interval waktu 30 menit
            const [hour, minute] = timePart.split('.');
            const intervalMinute = Math.floor(parseInt(minute) / 15) * 15;
            const timeKey = `${hour}:${intervalMinute.toString().padStart(2, '0')}`; // ubah format waktu
            
            // declare array jika belum ada timegroup
            if (!timeGroups[timeKey]) {
                timeGroups[timeKey] = {
                    temperatureValues: [],
                    humidityValues: [],
                    ppmValues: [],
                };
            }

            // push data jika bukan nan
            if (value.Temperature !== "nan") {
                timeGroups[timeKey].temperatureValues.push(parseFloat(value.Temperature));
            }
            if (value.Humidity !== "nan") {
                timeGroups[timeKey].humidityValues.push(parseFloat(value.Humidity));
            }
            if (value.PPM !== "nan") {
                timeGroups[timeKey].ppmValues.push(parseFloat(value.PPM));
            }
        });
        
        // hitung average
        const calculateAvg = (arr) => {
            if (arr.length === 0) return "nan";
            return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
        };
        
        // return data setelah diAveraged
        return Object.entries(timeGroups)
            .map(([timeKey, values]) => ({
                date: timeKey,
                temperature: calculateAvg(values.temperatureValues),
                humidity: calculateAvg(values.humidityValues),
                ppm: calculateAvg(values.ppmValues),
            }))
            .sort((a, b) => {
                const timeA = a.date.split(':').map(Number);
                const timeB = b.date.split(':').map(Number);
                return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
            });
    };

    useEffect(() => {
        const fetchData = () => {
            const dataRef = ref(db, "AirQualityMonitorC");
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

    // atur mode graph
    const commonOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    const temperatureData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: 'Temperature (°C)',
            data: dataAverage.map(data => data.temperature === "nan" ? null : parseFloat(data.temperature)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1
        }]
    };

    const humidityData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: 'Humidity (%)',
            data: dataAverage.map(data => data.humidity === "nan" ? null : parseFloat(data.humidity)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.1
        }]
    };

    const ppmData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: 'PPM',
            data: dataAverage.map(data => data.ppm === "nan" ? null : parseFloat(data.ppm)),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
        }]
    };

    return (
        <div className="App">
            <Heading />
            <div className="Button">
                <Link to="/BuildingC">
                    <button type="button" className="btn btn-outline-light">Back</button>
                </Link>
            </div>
            <p className="TimeChart">
            <b>
                {new Date().toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'Asia/Jakarta'
                })}
                </b> 
            </p>
            {loading ? (
                <div style={{ textAlign: 'center', color: 'white' }}>Loading...</div>
            ) : (
                <>
                    <div className="Graph-wrap">
                        <h3 style={{ color: 'white', textAlign: 'center' }}>Temperature</h3>
                        <Line 
                            data={temperatureData} 
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: {
                                        display: true,
                                        color: 'white',
                                        font: { size: 16 }
                                    }
                                }
                            }} 
                        />
                    </div>
                    <div className="Graph-wrap">
                        <h3 style={{ color: 'white', textAlign: 'center' }}>Humidity</h3>
                        <Line 
                            data={humidityData} 
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: {
                                        display: true,
                                        color: 'white',
                                        font: { size: 16 }
                                    }
                                }
                            }} 
                        />
                    </div>
                    <div className="Graph-wrap">
                        <h3 style={{ color: 'white', textAlign: 'center' }}>PPM CO2</h3>
                        <Line 
                            data={ppmData} 
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: {
                                        display: true,
                                        color: 'white',
                                        font: { size: 16 }
                                    }
                                }
                            }} 
                        />
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
}

export default ChartC;