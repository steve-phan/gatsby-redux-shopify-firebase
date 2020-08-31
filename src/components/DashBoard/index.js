import React, { useState, useEffect } from 'react'
import FormInput from '../../ShareForm/FormInput'
import { useSelector, useDispatch } from 'react-redux'
import './styles.scss'

import {
  auth,
  firestore,
  getUserData,
  getCurrentUser,
  handleUserProfile,
} from '../../firebase/utils'
import Button from '../../ShareForm/Button'
import { navigate, Link } from 'gatsby'
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

export default function DashBoard() {
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [floor, setFloor] = useState('')
  const { currentUser } = useSelector(mapState)
  const getUserData = e => {
    e.preventDefault()
    const additionalData = { street, postcode, city, floor }
    const x = getCurrentUser()
      .then(user => {
        const userRef = firestore.doc(`users/${user.uid}`)
        userRef.update({ ...additionalData })
        alert('Update successfully')
        navigate('/cart')
        // userRef
        //   .get()
        //   .then(doc => {
        //     if (doc.data().street) {
        //       setStreet(doc.data().street)
        //       setPostcode(doc.data().postcode)
        //       setCity(doc.data().city)
        //       setFloor(doc.data().street)
        //     }
        //   })
        //   .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) {
        return
      } else {
        const userRef = firestore.doc(`users/${user.uid}`)
        // userRef.update({ ...additionalData })
        userRef
          .get()
          .then(doc => {
            if (doc.data().street) {
              setStreet(doc.data().street)
              setPostcode(doc.data().postcode)
              setCity(doc.data().city)
              setFloor(doc.data().floor)
            }
          })
          .catch(err => console.log(err))
      }
    })
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="formWrap">
        <p className="access-dashboard">
          Just <Link to="/login">Login</Link> or{' '}
          <Link to="/registation">Register</Link> to get access this page
        </p>
      </div>
    )
  }

  return (
    <div className="formWrap">
      <form action="">
        <div className="user-street">
          <p>Street , House number</p>
          <FormInput value={street} onChange={e => setStreet(e.target.value)} />
        </div>
        <div className="user-floor">
          Floor
          <FormInput value={floor} onChange={e => setFloor(e.target.value)} />
        </div>
        <div className="user-postcode">
          <p>Postcode</p>
          <FormInput
            value={postcode}
            onChange={e => setPostcode(e.target.value)}
          />
        </div>
        <div className="user city">
          <p>City</p>
          <FormInput value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <Button onClick={getUserData}>Update</Button>
      </form>
    </div>
  )
}
