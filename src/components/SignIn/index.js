import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, resetError } from '../../redux/User/user.actions'

import { auth, GoogleProvider, handleUserProfile } from './../../firebase/utils'
import SocialLogin from '../../ShareForm/SocialLogin'
import FormInput from '../../ShareForm/FormInput'
import Button from '../../ShareForm/Button'

import './styles.scss'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  errors: user.errors,
})

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { currentUser, errors } = useSelector(mapState)

  const handleSignIn = e => {
    e.preventDefault()
    dispatch(emailSignInStart({ email, password }))
    console.log(email)
  }
  const handleAccRecover = () => {
    console.log('cover....')
  }
  useEffect(() => {
    dispatch(resetError())

    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  return (
    <div className="formWrap">
      <SocialLogin />
      <span className="line">Or</span>
      <form onSubmit={handleSignIn} action="">
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
      <p className='errors'>{errors}</p>
        <Button type="submit">Submit</Button>
        <Link
          className="forget-password"
          onClick={handleAccRecover}
          to="/accountrecover"
        >
          Forget password?
        </Link>
      </form>
    </div>
  )
}

export default SignIn
