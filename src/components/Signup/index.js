import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import FormInput from '../../ShareForm/FormInput'
import Button from '../../ShareForm/Button'

import { useDispatch, useSelector } from 'react-redux'
//import firebase
import { auth, handleUserProfile } from './../../firebase/utils'
import { signUpUser, resetError , userError } from '../../redux/User/user.actions'

import './styles.scss'
import SocialLogin from '../../ShareForm/SocialLogin'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  errors: user.errors,
})

export default function Signup(props) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { currentUser, errors } = useSelector(mapState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetError())
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  const handleFormSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
   dispatch(userError('Confirmpasswort didnt match'))
    } else {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const additionalData = { displayName }
        const userAuth = user.user
        handleUserProfile({ userAuth, additionalData })

        dispatch(signUpUser())
      })
      .catch(err => {
        console.log(err)
        let errSign;
        if ( err.code === 'auth/weak-password'){
          errSign = 'Password should be at least 6 characters'
        }
        if ( err.code === 'auth/email-already-in-use'){
          errSign = 'The email address is already in use by another account'
        }
        dispatch(userError(errSign))
      })
    }
  }

  return (
    <div className="formWrap">
      <SocialLogin />
      <span className="line">Or</span>

      <form onSubmit={handleFormSubmit} action="">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Full Name"
          handleChange={e => setDisplayName(e.target.value)}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Your Email"
          handleChange={e => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="Your password"
          handleChange={e => setPassword(e.target.value)}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm your password"
          handleChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <p className="errors">{errors}</p>

        <Button type="submit">Submit </Button>
      </form>
    </div>
  )
}
