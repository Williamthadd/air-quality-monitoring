const db = require('../Firebase/FirebaseConfig');
const mqtt = require('mqtt');

const mqttServer = 'broker.mqtt.cool';
const mqttPort = 1883;
const mqttUsername = 'binusian';
const mqttPassword = 'binusian';
const mqtt_topic_main = 'AirQualityMonitor';

const client = mqtt.connect({
  host: mqttServer,
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});

client.on('connect', () => {
  client.subscribe(mqtt_topic_main);
});

client.on('message', (topic, message) => {
  console.log(message.toString());
  
  const currentTime = new Date().toLocaleString();

  const components = message.toString().split(", ");
  let temperature, humidity, airQualityIndex;
  components.forEach(component => {
    if (component.startsWith("Temperature")) {
      temperature = component.split(": ")[1];
    } else if (component.startsWith("Humidity")) {
      humidity = component.split(": ")[1];
    } else if (component.startsWith("AQI")) {
      airQualityIndex = component.split(": ")[1];
    }
  });

  const dataObject = {
    time: currentTime,
    message: message.toString(),
    Temperature: temperature,
    Humidity: humidity,
    AQI: airQualityIndex
  };
  
  const dataRef = db.ref('AirQualityMonitor');
  dataRef.push(dataObject);
});

client.on('error', (error) => {
  console.error('Error:', error);
});