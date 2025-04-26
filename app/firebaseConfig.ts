// Importar funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYrrcjHk1Q7PGvqugREJPPCbMb6xBCB84",
  authDomain: "p3-frontend.firebaseapp.com",
  projectId: "p3-frontend",
  storageBucket: "p3-frontend.appspot.com",
  messagingSenderId: "979893561872",
  appId: "1:979893561872:web:995e3f42fafdd774464615"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);
