// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase configuration
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

// Handle Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch user role from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const role = userData.role; // Role (admin/driver)

      if (role === "admin") {
        window.location.href = "dashboard.html"; // Redirect Admin
      } else if (role === "driver") {
        window.location.href = "driver.html"; // Redirect Driver
      } else {
        alert("Invalid user role!");
      }
    } else {
      alert("User data not found!");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Handle Sign-Up (Assigning Roles)
async function registerUser(email, password, role) {
  try {
    const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = newUserCredential.user;

    // Store user info in Firestore with role
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      uid: user.uid,
      role: role, // Assign role
    });

    alert(`${role} account created successfully!`);
    window.location.href = role === "admin" ? "admin_dashboard.html" : "driver_dashboard.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
}
