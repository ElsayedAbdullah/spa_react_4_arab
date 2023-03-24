// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_8O43UPZ2cmuxmg02Alm2TW0QLF6Tgo0',
  authDomain: 'react-proj-f0838.firebaseapp.com',
  projectId: 'react-proj-f0838',
  storageBucket: 'react-proj-f0838.appspot.com',
  messagingSenderId: '968974309255',
  appId: '1:968974309255:web:8cfeae82d64f50bdfa6522'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
