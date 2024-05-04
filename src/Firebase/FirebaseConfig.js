// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgHany4W74s_HfnBYbTQU4uLhACO_wozs",
  authDomain: "airquality-6fa1b.firebaseapp.com",
  projectId: "airquality-6fa1b",
  storageBucket: "airquality-6fa1b.appspot.com",
  messagingSenderId: "587152917043",
  appId: "1:587152917043:web:463a86db01d5b858025946"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ambil referensi ke Firebase Realtime Database
const db = firebase.database();
const airQualityRef = db.ref('airQuality');

// Mendengarkan perubahan pada data airQuality
airQualityRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log('Data kualitas udara:', data);
  // Lakukan sesuatu dengan data, misalnya tampilkan di UI
});
