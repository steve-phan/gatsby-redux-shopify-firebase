import userTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  errors: null,
  userAddress: {},
}
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case userTypes.CHECK_USER_SESSION:
    //   return {
    //     ...state,
    //     currentUser : action.payload
    //   }
    case userTypes.USER_ERROR:
      return {
        ...state,
        errors: action.payload,
      }
    case userTypes.RESET_ERROR:
      return {
        ...state,
        errors: null,
      }
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      }

    case userTypes.SIGN_IN_WITH_GOOGLE:
      return {
        ...state,
        currentUser: action.payload,
      }
    case userTypes.SIGN_UP_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case userTypes.SIGN_IN_WITH_FACEBOOK:
      return {
        ...state,
        currentUser: action.payload,
      }
    case userTypes.USER_SIGN_OUT:
      return {
        ...state,
        currentUser: action.payload,
      }
    case userTypes.USER_ADD_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      }

    default:
      return state
  }
}
export default userReducer
