import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfrMeoodJ3AESSMDG_zj2lTLhjUgFfj0Y",
  authDomain: "finnport-2ab9e.firebaseapp.com",
  projectId: "finnport-2ab9e",
  storageBucket: "finnport-2ab9e.appspot.com",
  messagingSenderId: "136863420771",
  appId: "1:136863420771:web:5b6a5376891a4378d6c356",
  measurementId: "G-LWE9GSV0JV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
