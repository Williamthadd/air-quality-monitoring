import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, onValue } from "../Firebase/FirebaseConfigReact.js";
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartC() {
    const [dataAverage, setDataAverage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(false);

    const getAverageData = (data) => {
        const today = new Date();
        const todayStr = today.toLocaleDateString();
        const timeGroups = {};
        let hasValidData = false;

        Object.entries(data).forEach(([_, value]) => {
            if (!value || !value.Time) {
                setTimeout(() => {
                    getAverageData(data);
                }, 5000);
                return;
            }

            const [datePart, timePart] = value.Time.split(", ");
            const [day, month, year] = datePart.split("/");
            const dateStr = `${month}/${day}/${year}`;

            if (dateStr !== todayStr) return;

            let hour, minute;
            if (timePart.includes("AM") || timePart.includes("PM")) {
                const [time, period] = timePart.split(" ");
                const [hourStr, minuteStr] = time.split(":");
                
                hour = parseInt(hourStr);
                minute = parseInt(minuteStr);
                
                if (period === "PM" && hour !== 12) {
                    hour += 12;
                } else if (period === "AM" && hour === 12) {
                    hour = 0;
                }
            } else {
                const [hourStr, minuteStr] = timePart.split(".");
                hour = parseInt(hourStr);
                minute = parseInt(minuteStr);
            }

            const intervalMinute = Math.floor(minute / 15) * 15;
            const timeKey = `${hour.toString().padStart(2, "0")}:${intervalMinute.toString().padStart(2, "0")}`;

            if (!timeGroups[timeKey]) {
                timeGroups[timeKey] = {
                    temperatureValues: [],
                    humidityValues: [],
                    ppmValues: []
                };
            }

            if (value.Temperature && value.Temperature !== "nan") {
                timeGroups[timeKey].temperatureValues.push(parseFloat(value.Temperature));
                hasValidData = true;
            }
            if (value.Humidity && value.Humidity !== "nan") {
                timeGroups[timeKey].humidityValues.push(parseFloat(value.Humidity));
                hasValidData = true;
            }
            if (value.PPM && value.PPM !== "nan") {
                timeGroups[timeKey].ppmValues.push(parseFloat(value.PPM));
                hasValidData = true;
            }
        });

        setHasData(hasValidData);

        if (!hasValidData) {
            return [];
        }

        return Object.entries(timeGroups)
            .map(([timeKey, values]) => ({
                date: timeKey,
                temperature: values.temperatureValues.length > 0 
                    ? (values.temperatureValues.reduce((a, b) => a + b, 0) / values.temperatureValues.length).toFixed(2)
                    : "nan",
                humidity: values.humidityValues.length > 0
                    ? (values.humidityValues.reduce((a, b) => a + b, 0) / values.humidityValues.length).toFixed(2)
                    : "nan",
                ppm: values.ppmValues.length > 0
                    ? (values.ppmValues.reduce((a, b) => a + b, 0) / values.ppmValues.length).toFixed(2)
                    : "nan"
            }))
            .sort((a, b) => {
                const [hourA, minA] = a.date.split(":").map(Number);
                const [hourB, minB] = b.date.split(":").map(Number);
                return (hourA * 60 + minA) - (hourB * 60 + minB);
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

    const commonOptions = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: "white" },
                grid: { color: "rgba(255, 255, 255, 0.1)" }
            },
            x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255, 255, 255, 0.1)" }
            }
        }
    };

    const temperatureData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: "Temperature (°C)",
            data: dataAverage.map(data => data.temperature === "nan" ? null : parseFloat(data.temperature)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.1
        }]
    };

    const humidityData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: "Humidity (%)",
            data: dataAverage.map(data => data.humidity === "nan" ? null : parseFloat(data.humidity)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.1
        }]
    };

    const ppmData = {
        labels: dataAverage.map(data => data.date),
        datasets: [{
            label: "PPM",
            data: dataAverage.map(data => data.ppm === "nan" ? null : parseFloat(data.ppm)),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
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
                    {new Date().toLocaleString('en-EN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'Asia/Jakarta'
                    })}
                </b>
            </p>
            {loading ? (
                <div className="chart-text">Loading...</div>
            ) : !hasData ? (
                <div className="chart-text">No data yet...</div>
            ) : (
                <>
                    <div className="Graph-wrap">
                        <h3 className="chart-text">Temperature</h3>
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
                        <h3 className="chart-text">Humidity</h3>
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
                        <h3 className="chart-text">PPM CO2</h3>
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