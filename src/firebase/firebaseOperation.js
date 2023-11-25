import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  arrayRemove,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// Función para registrar usuario
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logoutUser = async () => {
  return await signOut(auth);
};

// Función para añadir contenido
export const addContent = async (userId, content) => {
  const userDocRef = doc(db, "users", userId);
  const contentToAdd = {
    ...content,
    timestamp: new Date(),
  };

  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return await updateDoc(userDocRef, {
      movies: arrayUnion(contentToAdd),
    });
  } else {
    return await setDoc(userDocRef, {
      movies: [contentToAdd],
    });
  }
};

// Función para obtener contenido
export const getUserContent = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.movies || [];
  } else {
    throw new Error("No user document found");
  }
};

// Función para eliminar contenido específico
export const deleteContent = async (userId, contentToDelete) => {
  const userDocRef = doc(db, "users", userId);
  return await updateDoc(userDocRef, {
    movies: arrayRemove(contentToDelete),
  });
};

// Función para eliminar todo el contenido
export const clearAllContent = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  return await updateDoc(userDocRef, {
    movies: [],
  });
};
