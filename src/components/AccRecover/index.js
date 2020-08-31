import React, { useState } from 'react'
import FormInput from '../../ShareForm/FormInput'
import Button from '../../ShareForm/Button'
import { navigate } from 'gatsby'
import { auth } from '../../firebase/utils'

import './styles.scss'

export default function Recover() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState()
  const handleAccRecover = e => {
    e.preventDefault()
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Successfully ❤ Check your Email')
        navigate('/login')
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
        //   alert('This email address is incorrect, try again')
        //   navigate('/accountrecover')
        setError('Email is icorrect, try again')
        }
        // setError(err.code)
        console.log(err.code)
      })
  }
  return (
    <div className="formWrap">
      <form action="" onSubmit={handleAccRecover}>
        <h2>Reset your password </h2>
       
        <FormInput
          type="email"
          name="emai"
          value={email}
          placeholder="Your email address"
          onChange={e =>{ 
            setError('')  
            setEmail(e.target.value)}}
          required
        />
         <p className='errors'>{error}</p>
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
