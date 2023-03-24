// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzlU3EgJ8brqjw-LYqSyrdNbdfv2hxvb0',
  authDomain: 'syd-react.firebaseapp.com',
  projectId: 'syd-react',
  storageBucket: 'syd-react.appspot.com',
  messagingSenderId: '180175710200',
  appId: '1:180175710200:web:37bb5061be8f2eb12f580d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
