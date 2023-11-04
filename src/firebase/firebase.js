// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIjDybUHyMU1XdJXly72Zg10aMDq_coS0",
  authDomain: "movie-realm-1974c.firebaseapp.com",
  projectId: "movie-realm-1974c",
  storageBucket: "movie-realm-1974c.appspot.com",
  messagingSenderId: "849423876197",
  appId: "1:849423876197:web:05629b3226b968665e868c",
  measurementId: "G-7H66VHWYBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {auth,app}