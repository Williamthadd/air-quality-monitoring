// import data dari library dan file di tempat lain
const db = require('../Firebase/FirebaseConfigNode');
const mqtt = require('mqtt');

// delcare data mqtt
const mqttServer = 'broker.mqtt.cool';
const mqttPort = 1883;
const mqttUsername = 'binusian';
const mqttPassword = 'binusian';
const mqtt_topic_main = 'AirQualityMonitorA';

//koneksi ke mqtt
const client = mqtt.connect({
  host: mqttServer,
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});

//menetapkan event handling koneksi ke mqtt
client.on('connect', () => {
  client.subscribe(mqtt_topic_main);
});

//mengambil output dari message mqtt
client.on('message', (topic, message) => {
  console.log(message.toString());
  
  const currentTime = new Date().toLocaleString();

  //mengambil data yg lebih spesifik dengan memecah isi message
  const components = message.toString().split(", ");
  let temperature, humidity, ppm;
  components.forEach(component => {
    if (component.startsWith("Temperature")) {
      temperature = component.split(": ")[1];
    } else if (component.startsWith("Humidity")) {
      humidity = component.split(": ")[1];
    } else if (component.startsWith("PPM")) {
      ppm = component.split(": ")[1];
    }
  });

  //mengelompokan isi data agar structure nya sesuai yang akan diInput ke database
  const dataObject = {
    Time: currentTime,
    Message: message.toString(),
    Temperature: temperature,
    Humidity: humidity,
    PPM: ppm
  };
  
  // masukin data ke firebase
  const dataRef = db.ref('AirQualityMonitorA');
  dataRef.push(dataObject);
});

//output jika ada error
client.on('error', (error) => {
  console.error('Error:', error);
});