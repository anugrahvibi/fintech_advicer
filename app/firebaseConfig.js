// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpucApZL4xsZB-Dofv1-1lpZ7zSJ08r8E",
  authDomain: "fintechadvicer.firebaseapp.com",
  projectId: "fintechadvicer",
  storageBucket: "fintechadvicer.firebasestorage.app",
  messagingSenderId: "384418735953",
  appId: "1:384418735953:web:9fd05ef85fc729eefc1570",
  measurementId: "G-SZZBKRHY66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}