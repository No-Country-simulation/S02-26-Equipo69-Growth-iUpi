// Importamos las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwxeOwzYFDC0uuywGeHhnhgXj4bos0B8w",
  authDomain: "iupi-mvp.firebaseapp.com",
  projectId: "iupi-mvp",
  storageBucket: "iupi-mvp.firebasestorage.app",
  messagingSenderId: "525572724841",
  appId: "1:525572724841:web:70b6a324ab095a59162af8"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos la base de datos para usarla en los otros archivos
export { db };