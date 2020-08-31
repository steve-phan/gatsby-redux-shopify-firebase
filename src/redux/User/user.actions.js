import userTypes from './user.types'

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
  // payload : true
})

export const signInWithGoogle = () => ({
  type: userTypes.SIGN_IN_WITH_GOOGLE,
  payload: true,
})

export const signInWithFacebook = () => ({
  type: userTypes.SIGN_IN_WITH_FACEBOOK,
  payload: true,
})
export const signUpUser = () => ({
  type: userTypes.SIGN_UP_USER,
  payload: true,
})
export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
})

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
})

export const userAddAddress = userAddress => ({
  type: userTypes.USER_ADD_ADDRESS,
  payload : userAddress
})
export const userError = err => ({
  type: userTypes.USER_ERROR,
  payload: err,
})
export const resetError = () => ({
  type: userTypes.RESET_ERROR,
})
export const userSignOut = () => ({
  type: userTypes.USER_SIGN_OUT,
  payload: null,
})
