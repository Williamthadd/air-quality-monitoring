const mqtt = require('mqtt');

const mqttServer = 'broker.mqtt.cool';
const mqttPort = 1883;
const mqttUsername = 'binusian';
const mqttPassword = 'binusian';
const mqttTopic = 'AirQualityMonitor';

const client = mqtt.connect({
  host: mqttServer,
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword
});

client.on('connect', () => {
  console.log('Connected to MQTT Broker : ' + mqttTopic);
  client.subscribe(mqttTopic);
});

client.on('error', (error) => {
  console.error('Error:', error);
});
