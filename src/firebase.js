
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB738Rx9g_SCbixerzYlzNmqcO9js39BYQ",
  authDomain: "hurdy-app.firebaseapp.com",
  projectId: "hurdy-app",
  storageBucket: "hurdy-app.firebasestorage.app",
  messagingSenderId: "243542792893",
  appId: "1:243542792893:web:570026a099e507109b75d4"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);


export default app;