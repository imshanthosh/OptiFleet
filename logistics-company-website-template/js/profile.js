// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiRA2Ew_t2cfmOCixhLVwNZ2BMJ3HOhWI",
  authDomain: "routeoptimization-e2162.firebaseapp.com",
  projectId: "routeoptimization-e2162",
  storageBucket: "routeoptimization-e2162.firebasestorage.app",
  messagingSenderId: "287580624829",
  appId: "1:287580624829:web:f6454a9f591b7affda24d4",
  measurementId: "G-2Q24H2CNDZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to display user profile
const displayUserProfile = async (user) => {
  if (user) {
    // Fetch Email from Firebase Auth
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userId").textContent = user.uid;

    // Fetch Username from Firestore
    const userRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("userName").textContent = userData.username || "No Username Set";
      } else {
        console.log("No username found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    window.location.href = "login.html"; // Redirect if not logged in
  }
};

// Check authentication state
onAuthStateChanged(auth, (user) => {
  displayUserProfile(user);
});

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html"; // Redirect on logout
    })
    .catch((error) => {
      console.error("Logout Error:", error);
    });
});
