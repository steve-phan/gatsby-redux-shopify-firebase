import { takeLatest, call, all, put } from 'redux-saga/effects'
import userTypes from './user.types'
import { signInSuccess, userError, userAddAddress } from './user.actions'
import { getCurrentUser, handleUserProfile, auth } from '../../firebase/utils'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    })
    const snapshot = yield userRef.get()

    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    )
  } catch (error) {
    console.log(error)
  }
}
// userAddAddress({
//   street: snapshot.data().street,
//   postcode: snapshot.data().postcode,
//   city: snapshot.data().city,
//   floor: snapshot.data().floor,
// }

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    console.log(userAuth + '  is checking')

    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    console.log(error)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)

    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(userError('Wrong password or Email'))
  }
}

export function* onSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export default function* userSagas() {
  yield all([call(onCheckUserSession), call(onSignInStart)])
}
