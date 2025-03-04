//import library dan file dari tempat lain
import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";
import William from "./Asset/William.jpg";
import Timothy from "./Asset/Timothy.jpg";
import Axel from "./Asset/Axel.jpg";
import Architecture from "./Asset/Architecture.png";
import Network from "./Asset/Network.png";
import Hardware from "./Asset/Hardware.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <div class="App">
      <Heading />
      <div className="Button">
          <Link to="/">
              <button type="button" className="btn btn-outline-light">Back</button>
          </Link>
      </div>
      <h1 className="About-title">About Us</h1>
      <p className="About-sub-title">Who are we?</p>
      <p className="About-text">We are the founder of WiTiAx (William, Timothy, Axel). As our college thesis project in IoT topic, we created this website to help you monitor air quality in your class room.</p>
      <div class="container text-center">
        <div class="row justify-content-evenly">
          <div class="col-md-4">
            <div class="card" style={{ width: "18rem" }}>
              <a href="https://www.linkedin.com/in/william-thaddeus-6151751a7/" target="_blank"><img src={William} class="card-img-top" alt="..."></img></a>
              <div class="card-body">
                <p class="card-title">William Thaddeus</p>
                <p >Roles:</p>
                <ul>
                  <li>System Architect</li>
                  <li>Back-end Engineer</li>
                  <li>Hardware Engineer</li>
                  <li>Researcher</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
          <div class="card" style={{ width: "18rem" }}>
              <a href="https://www.linkedin.com/in/timothy-micha-281033226/" target="_blank"><img src={Timothy} class="card-img-top" alt="..."></img></a>
              <div class="card-body">
                <p class="card-title">Timothy Micha Z</p>
                <p >Roles:</p>
                <ul>
                  <li>UI/UX Designer</li>
                  <li>Hardware Engineer</li>
                  <li>Researcher</li>
                  <br></br>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
          <div class="card" style={{ width: "18rem" }}>
              <a href="https://www.linkedin.com/in/axelnbr/" target="_blank"><img src={Axel} class="card-img-top" alt="..."></img></a>
              <div class="card-body">
                <p class="card-title">Axel Nathaniel B</p>
                <p >Roles:</p>
                <ul>
                  <li>Front-end Engineer</li>
                  <li>Hardware Engineer</li>
                  <li>Researcher</li>
                  <br></br>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="About-sub-title">What is WiTiAx?</p>
      <p className="About-text">WiTiAx which the name comes from the combitain of the founders' names: William, Timothy, and Axel, is a website that helps you monitor air quality in your class room. This website is integrated with sensors that measure air quality parameters such as Temperature, Humidity, and PPM (parts per million) CO2. So, it displays <u>real-time</u> data from the sensors that are placed in certain class rooms.</p>
      <p className="About-text">Technologies:</p>
      <div class="container text-center">
  <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{ color: "white" }}>
    <div class="col tech-box">
      <div class="p-3">ReactJs</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">NodeJs</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">Bootstrap</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">HTML</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">CSS</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">JavaScript</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">Arduino IDE</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">Github</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">Vercel App</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">MQTT Broker</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">Firebase</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">ESP32 DEV KIT V1</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">MQ-135 Sensor</div>
    </div>
    <div class="col tech-box">
      <div class="p-3">DHT11 Sensor</div>
    </div>
  </div>
</div>

<p className="About-sub-title">How does it work?</p>

<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src={Architecture} class="d-block w-100 image-carousel" alt="..."></img>
    </div>
    <div class="carousel-item">
    <img src={Network} class="d-block w-100 image-carousel" alt="..."></img>
    </div>
    <div class="carousel-item">
    <img src={Hardware} class="d-block w-100 image-carousel" alt="..."></img>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<p className="About-text">As the hardware (ESP32, DHT11, MQ-135) is on, the microcontroller ESP32 will send the air quality data to the MQTT Broker. Then, the data will be read by the NodeJs server and store the data in the Firebase database. ReactJs will fetch and process the data from the Firebase database and display it to the user.</p>

      <Footer />
    </div>
  );
}

export default About;
