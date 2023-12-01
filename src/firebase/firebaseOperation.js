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

// Función para actualizar el estado de "viewed" de una película
export const toggleMovieViewedStatus = async (userId, movieId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    // Obtener las películas actuales
    const movies = userDoc.data().movies || [];
    // Encontrar el índice de la película a actualizar
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex !== -1) {
      // Cambiar el estado de "viewed"
      const updatedMovies = [...movies];
      updatedMovies[movieIndex] = {
        ...updatedMovies[movieIndex],
        viewed: !updatedMovies[movieIndex].viewed,
      };

      // Actualizar el documento
      return await updateDoc(userDocRef, {
        movies: updatedMovies,
      });
    } else {
      throw new Error("Movie not found");
    }
  } else {
    throw new Error("User document does not exist");
  }
};

// Función para actualizar el estado de "favourited" de una película
export const toggleMovieFavouritedStatus = async (userId, movieId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    // Obtener las películas actuales
    const movies = userDoc.data().movies || [];
    // Encontrar el índice de la película a actualizar
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex !== -1) {
      // Cambiar el estado de "favourited"
      const updatedMovies = [...movies];
      updatedMovies[movieIndex] = {
        ...updatedMovies[movieIndex],
        favourited: !updatedMovies[movieIndex].favourited,
      };

      // Actualizar el documento
      return await updateDoc(userDocRef, {
        movies: updatedMovies,
      });
    } else {
      throw new Error("Movie not found");
    }
  } else {
    throw new Error("User document does not exist");
  }
};
