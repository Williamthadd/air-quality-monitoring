//implementasi firebase untuk environment ReactJs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, query, orderByChild, limitToLast } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDgHany4W74s_HfnBYbTQU4uLhACO_wozs",
    authDomain: "airquality-6fa1b.firebaseapp.com",
    databaseURL: "https://airquality-6fa1b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "airquality-6fa1b",
    storageBucket: "airquality-6fa1b.appspot.com",
    messagingSenderId: "587152917043",
    appId: "1:587152917043:web:463a86db01d5b858025946"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, query, orderByChild, limitToLast };