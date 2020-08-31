import React from 'react'
import { Container } from '../../utils/styles'
import SignIn from '../components/SignIn'

function Login() {
  return (
    <Container>
      <h2 className="pageHeadline">Login.</h2>
      <SignIn />
    </Container>
  )
}

export default Login
