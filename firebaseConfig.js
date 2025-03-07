import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiRA2Ew_t2cfmOCixhLVwNZ2BMJ3HOhWI",
  authDomain: "routeoptimization-e2162.firebaseapp.com",
  projectId: "routeoptimization-e2162",
  storageBucket: "routeoptimization-e2162.appspot.com",
  messagingSenderId: "287580624829",
  appId: "1:287580624829:web:f6454a9f591b7affda24d4",
  measurementId: "G-2Q24H2CNDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc};