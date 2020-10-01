import React, { useState, useEffect } from 'react'

import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import { auth, firestore } from './../../firebase/utils'

import { Button } from 'react-bootstrap'

import './styles.scss'
import ShoppingCart from './../../assets/shopping.svg'
import { userSignOut } from '../../redux/User/user.actions'
import { clearCart } from '../../redux/Store/store.action'
const mapState = ({ user, store }) => ({
  currentUser: user.currentUser,
  products: store.products,
  userAddress: user.userAddress,
})

const Navigation = props => {
  const [openmodal, setOpenmodal] = useState()
  const [totalItem, setTotalItem] = useState(0)
  const { currentUser, products, userAddress } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch()
  const openBoard = () => {
    console.log(props)
    const modal = document.getElementById('openmodal-btn')
    window.addEventListener('click', e => {
      if (e.target === modal) {
        setOpenmodal('openmodal')
      } else {
        setOpenmodal('')
      }
    })
  }
  const closeModal = () => {
    document.getElementById('menubar-toggle').checked = false
  }
  console.log(userAddress.displayName)
  // if (products.length > 0) {
  //   const x = products.map(item => item.value).reduce((a, b) => a + b)
  //   console.log(x)
  //   setTotalItem(x)
  // }
  // TODO Need  number 0 as a initial  value when reduce a empty array !
  const x = products.map(item => item.value).reduce((a, b) => a + b, 0)
  useEffect(
    () => {
      if (products.length > 0) {
        const j = products.map(item => item.value).reduce((a, b) => a + b, 0)
        setTotalItem(j)
      }

      return () => {
        setTotalItem(0)
      }
    },

    // TODO Conditionally firing an effect , [dependencies]
    [products.length, x]
  )

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(userSignOut())
      })
      .catch(err => {
        console.log(err)
      })
  }
  const clearItem = () => {
    localStorage.clear('oderItems')
    dispatch(clearCart())
  }

  return (
    <div className="wrapper-navigation">
      <div className="container-navigation">
        <div className="menubar-modal">
          <input hidden type="checkbox" name="" id="menubar-toggle" />
          <label htmlFor="menubar-toggle" className="menubar-icon-wrap">
            <label htmlFor="menubar-toggle" className="menubar-icon"></label>
          </label>
          <label htmlFor="menubar-toggle" className="overlay"></label>
          <div className="menubar-modal-box" id="menubarLeft">
            <div className="menubar-header">
              {userAddress.displayName ? (
                <Link to="/dashboard" onClick={closeModal}>
                  {' '}
                  <h3>{userAddress.displayName} </h3>
                  <span>Your account details</span>
                </Link>
              ) : (
                <h3>My Account </h3>
              )}
              <label htmlFor="menubar-toggle" className="menubar-close">
                {' '}
                &#10005;
              </label>
            </div>
            {currentUser ? (
              <div className="userSection">
                <Button variant="outline-primary" onClick={closeModal}>
                  <Link to="/cart">Your Cart</Link>
                </Button>
              </div>
            ) : (
              <div className="userSection">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={closeModal}
                >
                  <Link to="/login">Login</Link>
                </Button>

                <Button variant="primary" size="sm" onClick={closeModal}>
                  <Link to="/registation">Create Account</Link>
                </Button>
              </div>
            )}
            <ul className="menubar-modal-wrap">
              <li onClick={closeModal}>
                {' '}
                <Link to="/shop/#beliebte">Beliebte Gerichte</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#suppen">Suppen</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#salat"> Salat </Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#vorspeisen">Vorspeisen</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#reisundnudeln">
                  Gerichte mit Reis und Nudeln
                </Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#mitente">Gerichte mit Ente</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#mitschwein">Gerichte mit Schweinefleisch</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#mithuhn">Gerichte mit Hühnerfleisch</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="/shop/#mitrind">Gerichte mit Rindfleisch</Link>
              </li>
              <li onClick={closeModal}>
                <Link to="shop/#vegetarian">Vegetarische Gerichte</Link>
              </li>
              {/* add Item. Test scroll */}
            </ul>
          </div>
        </div>
        <Link to="/" className="menulink-main">
          DeXemNao
        </Link>
        <nav className="wrapper-nav">
          <div className={`account-modal ${openmodal}`}>
            <div className="modal-link">
              <Link to="/dashboard">Your Address</Link>
            </div>
            <div className="modal-link">
              <Link to="/cart">Your oder Cart</Link>
            </div>
            <div className="modal-link">
              <Link to="/" onClick={handleSignOut}>
                Sign out
              </Link>
            </div>
          </div>
          <Link to="/shop" className="menulink-nav login-link">
            Our Shop
          </Link>
          {currentUser ? (
            <div onClick={openBoard} className="wrap-account">
              <a id="openmodal-btn" className="menulink-nav navbar-btn">
                Your Account
              </a>
            </div>
          ) : (
            <>
              <Link to="/login" className="menulink-nav login-link">
                Login
              </Link>
              <Link to="/registation" className="menulink-nav registation-link">
                Registation
              </Link>
            </>
          )}

          <Link to="/cart" className="menulink-nav wrapper-cart">
            <ShoppingCart className="cartlogo" />
          </Link>
          <Link to="/cart">
            {' '}
            <div className="cartcounter">{totalItem}</div>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
