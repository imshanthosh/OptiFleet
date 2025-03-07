// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Ask user for role (Driver or Admin)
let role = prompt("Are you signing up as 'Driver' or 'Admin'?").toLowerCase();
if (role !== "driver" && role !== "admin") {
  alert("Invalid role! Please refresh and enter 'Driver' or 'Admin'.");
  throw new Error("Invalid role selection");
}

// Handle Signup functionality
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Store user info in Firestore with the selected role
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      role: role,  // Storing the role (Driver or Admin)
    });

    localStorage.setItem("userEmail", userCredential.user.email);
    localStorage.setItem("userRole", role);

    alert(`Account created successfully as ${role}!`);
    window.location.href = "login.html";  // Redirect to login page after successful sign up
  } catch (error) {
    console.error("Signup failed:", error.message);
    alert("Error: " + error.message);
  }
});
