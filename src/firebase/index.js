import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8uGQEKs1EYUmiwcBTTgehT4jU3BkaS7Q",
  authDomain: "ntg-vue.firebaseapp.com",
  databaseURL: "https://ntg-vue-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ntg-vue",
  storageBucket: "ntg-vue.appspot.com",
  messagingSenderId: "412388768230",
  appId: "1:412388768230:web:75fcd3c4325ed55dc97e27",
  measurementId: "G-06V80FXW57"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

export default  app;

