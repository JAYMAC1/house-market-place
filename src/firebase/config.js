// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByrGgGO8m_48NdzDz9Kdj7Oqbfio-i1dU',
  authDomain: 'house-marketplace-app-f366f.firebaseapp.com',
  projectId: 'house-marketplace-app-f366f',
  storageBucket: 'house-marketplace-app-f366f.appspot.com',
  messagingSenderId: '949679346504',
  appId: '1:949679346504:web:9e6e23e73e8e4d4c71997d',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
