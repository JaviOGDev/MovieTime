import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4Cd4ZfAhpMmnE_jzBeGJ3hfITbOxY2E8",
  authDomain: "movies-45838.firebaseapp.com",
  projectId: "movies-45838",
  storageBucket: "movies-45838.appspot.com",
  messagingSenderId: "126537957833",
  appId: "1:126537957833:web:dc3bb152405f86cac9a818",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Autenticación
export const db = getFirestore(app); // Firestore

export default app;
