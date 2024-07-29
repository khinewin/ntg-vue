// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8uGQEKs1EYUmiwcBTTgehT4jU3BkaS7Q",
  authDomain: "ntg-vue.firebaseapp.com",
  projectId: "ntg-vue",
  storageBucket: "ntg-vue.appspot.com",
  messagingSenderId: "412388768230",
  appId: "1:412388768230:web:75fcd3c4325ed55dc97e27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore()
export default db

//,{useFetchStreams: true}