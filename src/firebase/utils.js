import firebase from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/auth'
import 'firebase/firestore'

//redux Import
import { userAddAddress } from './../redux/User/user.actions'
import { useDispatch } from 'react-redux'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()

export const PhoneAuthProvider = new firebase.auth.PhoneAuthProvider()
GoogleProvider.setCustomParameters({ promt: 'select_acount' })

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return
  const { uid } = userAuth
  const userRef = firestore.doc(`users/${uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const timestamp = new Date()
    const userRoles = ['user']

    try {
      await userRef.set({
        displayName,
        email,
        createAt: timestamp,
        userRoles,
        ...additionalData,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return userRef
}
// export default firebase

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      // console.log(auth.currentUser)
      if (!userAuth) {
        return
      }
      unsubscribe()
      resolve(userAuth)
    }, reject)
    console.log(unsubscribe())
  })
}
