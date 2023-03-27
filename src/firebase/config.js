// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAibkBSak5BtAAFQ3QdrlFI1-p2aiVFfJY',
  authDomain: 'react-ali-course.firebaseapp.com',
  projectId: 'react-ali-course',
  storageBucket: 'react-ali-course.appspot.com',
  messagingSenderId: '997336479350',
  appId: '1:997336479350:web:3800295424485f2c425157'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
