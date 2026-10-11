// <!--COMP 3450: Authors: Magdala Nwuke, Fabeeha Anbar Ahmed, Oyinkansola Olarerin (Mabel)-->
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDOYdeSkSxmRkj_q1rSJrPHV40vVmQkiF4",
  authDomain: "acnevision-85adc.firebaseapp.com",
  databaseURL: "https://acnevision-85adc-default-rtdb.firebaseio.com",
  projectId: "acnevision-85adc",
  storageBucket: "acnevision-85adc.firebasestorage.app",
  messagingSenderId: "790385055700",
  appId: "1:790385055700:web:2c47213a66d4e489df6841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);