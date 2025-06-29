import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAiHs5dbyfgQA3gmKzr4Jp9_56fOqz-gD4",
  authDomain: "cf-remainder.firebaseapp.com",
  projectId: "cf-remainder",
  storageBucket: "cf-remainder.firebasestorage.app",
  messagingSenderId: "770362872164",
  appId: "1:770362872164:web:cd2e4ef4437dac85f6ea71",
  measurementId: "G-7S5X45YKG7",
  databaseURL: "https://cf-remainder-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig);