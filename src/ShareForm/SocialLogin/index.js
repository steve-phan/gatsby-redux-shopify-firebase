import React from 'react'
import './styles.scss'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'

import FacebokIcon from './../../assets/facebook.svg'
import GoogleIcon from './../../assets/google.svg'
import {
  auth,
  handleUserProfile,
  GoogleProvider,
  FacebookProvider,
} from './../../firebase/utils'
import userTypes from '../../redux/User/user.types'
import {
  signInWithGoogle,
  signInWithFacebook,
  userAddAddress,
} from '../../redux/User/user.actions'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userAddress: user.userAddress,
})
export default function SocialLogin() {
  const dispatch = useDispatch()
  const { currentUser, userAddress } = useSelector(mapState)

  const handleOnClickGoogle = e => {
    e.preventDefault()
    auth
      .signInWithPopup(GoogleProvider)
      .then(user => {
        const additionalData = user.user.displayName
        const userAuth = user.user
        // userAddress.push({ fullName: additionalData })
        // dispatch(userAddAddress(userAddress))
        handleUserProfile({ userAuth, additionalData })
        dispatch(signInWithGoogle())
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleClickFacebook = e => {
    e.preventDefault()
    console.log('facebook login clicking')
    auth
      .signInWithPopup(FacebookProvider)
      .then(user => {
        console.log('login facebook successfully')
        const additionalData = user.user.displayName
        const userAuth = user.user
        // userAddress.push({ fullName: additionalData })
        // dispatch(userAddAddress(userAddress))
        handleUserProfile({ userAuth, additionalData })
        dispatch(signInWithFacebook())
      })
      .then(err => {
        console.log(err)
      })
  }

  return (
    <div className="wrapper-social-login">
      <Button onClick={handleOnClickGoogle}>
        <GoogleIcon />
        <p>Login with Google</p>
      </Button>
      <Button onClick={handleClickFacebook}>
        <FacebokIcon />
        <p>Login with Facebook</p>
      </Button>
    </div>
  )
}
