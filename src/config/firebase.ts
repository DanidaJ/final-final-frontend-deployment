import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC5zzgEpNakWPXNGb0HoUXqoKpxwfReJ4U",
  authDomain: "chronotix-5e3ea.firebaseapp.com",
  projectId: "chronotix-5e3ea",
  storageBucket: "chronotix-5e3ea.appspot.com",
  messagingSenderId: "342528942533",
  appId: "1:342528942533:web:f7a3ec3a7f21e2c20fc9ae"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Auth instance
export const auth = getAuth(app)

// Get Firestore instance
export const db = getFirestore(app)

export default app 