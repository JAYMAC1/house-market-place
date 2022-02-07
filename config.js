import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyByrGgGO8m_48NdzDz9Kdj7Oqbfio-i1dU',
  authDomain: 'house-marketplace-app-f366f.firebaseapp.com',
  projectId: 'house-marketplace-app-f366f',
  storageBucket: 'house-marketplace-app-f366f.appspot.com',
  messagingSenderId: '949679346504',
  appId: '1:949679346504:web:9e6e23e73e8e4d4c71997d',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
