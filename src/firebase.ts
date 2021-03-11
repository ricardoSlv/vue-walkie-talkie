import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCZjFreaHfKrJYbxwEBVRYC4XOV9Yj4vhU',
  authDomain: 'vue-walkie-talkie-6c010.firebaseapp.com',
  projectId: 'vue-walkie-talkie-6c010',
  storageBucket: 'vue-walkie-talkie-6c010.appspot.com',
  messagingSenderId: '972530060238',
  appId: '1:972530060238:web:28bf4fa8cbd97664b4f99f',
  measurementId: 'G-5GBCWPMZHK'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
