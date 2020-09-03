import React, { useContext, useState, useEffect } from 'react'
import emailjs, { init } from 'emailjs-com'

import { useSelector, useDispatch } from 'react-redux'

import LineItem from './LineItem'
import './styles.scss'
import { useQuantity } from '../Navigation'
import { userAddAddress } from './../../redux/User/user.actions'
import { auth, firestore, getCurrentUser } from './../../firebase/utils'
import { navigate } from 'gatsby'
import ProductGrid from '../ProductGrid'
import OderBoard from '../OderBoard'
import { Link } from 'gatsby'
import storeTypes from '../../redux/Store/store.types'
import { addItem } from '../../redux/Store/store.action'

const mapState = ({ user, store }) => ({
  currentUser: user.currentUser,
  products: store.products,
})
init('user_kg0x3lYVzVIvxdN94ITu1')
const Cart = () => {
  const { currentUser, products } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [floor, setFloor] = useState('')
  const [email, setEmail] = useState('')

  const totalPay =
    products
      .map(product => product.price * product.value)
      .reduce((a, b) => a + b, 0) || ''

  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        const userRef = firestore.doc(`users/${user.uid}`)
        setEmail(user.email)
        userRef
          .get()
          .then(doc => {
            if (doc.data().street) {
              setDisplayName(doc.data().displayName)
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

  const handleCheckout = () => {
    if (!street) {
      alert('update your address to Oder')
      navigate('/dashboard')
      return
    } else {
      const oderMail = () => {
        return products
          .map(product => {
            return `<li> ${product.title} - ${product.value}x </li> `
          })
          .reduce((a, b) => a + b, '')
      }
      console.log(street)

      const templateParams = {
        message_html: `<div><ol> ${oderMail()} </ol></div>`,
        from_name: 'WeloveFood',
        to_bcc: `${email}`,
      }

      emailjs
        .send(
          'service_0kh9ok3',
          'template_vNBZtXYN',
          templateParams,
          'user_kg0x3lYVzVIvxdN94ITu1'
        )
        .then(
          result => {
            alert('Your Oder is successfully')
            dispatch(addItem([]))
            localStorage.removeItem('oderItems')
            navigate('/')
          },
          error => {
            console.log(error.text)
          }
        )
    }

    // checkout.lineItems.forEach(item => {
    //   console.log(`${item.title} so luong : ${item.quantity}`)
    // }) // window.open(checkout.webUrl)
  }

  return (
    <div className="wrap-cart">
      <div className="cartDetails">
        <OderBoard />
        <button onClick={handleCheckout} className="oderNow">
          Oder Now {totalPay ? `€${totalPay}` : ''}
        </button>
      </div>
      <div className="delivery-address">
        <h5>Delivery Address </h5>

        {street ? (
          <div className="user-address">
            <p> {displayName} </p>
            <span className="user-street"> {street}</span>
            <span> {floor ? `(${floor} floor)` : ''}</span>
            <span> {postcode} </span>
            <span>{city} </span>
          </div>
        ) : (
          <div className="needAddress">
            <span>
              Please <Link to="/login">Login </Link> or{' '}
              <Link to="/registation">Registation</Link>{' '}
            </span>
            <p> update your address to Oder</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
