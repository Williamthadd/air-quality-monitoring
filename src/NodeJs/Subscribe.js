const db = require('../Firebase/FirebaseConfig');
const mqtt = require('mqtt');

const mqttServer = 'broker.mqtt.cool';
const mqttPort = 1883;
const mqttUsername = 'binusian';
const mqttPassword = 'binusian';
const mqtt_topic_main = 'AirQualityMonitor';
const mqtt_topic_temp = "Temperature";
const mqtt_topic_hum = "Humidity";
const mqtt_topic_aqi = "AQI";


const client = mqtt.connect({
  host: mqttServer,
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});


client.on('connect', () => {
  client.subscribe(mqtt_topic_main);
  client.subscribe(mqtt_topic_temp);
  client.subscribe(mqtt_topic_hum);
  client.subscribe(mqtt_topic_aqi);
});


client.on('message', (topic, message) => {
  console.log(message.toString());
  
  const dataRef = db.ref('AirQualityMonitor');
  dataRef.push(message.toString());
});

client.on('error', (error) => {
  console.error('Error:', error);
});