import React, { useState, useEffect } from 'react'

import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import { auth } from './../../firebase/utils'

import './styles.scss'
import ShoppingCart from './../../assets/shopping.svg'
import { userSignOut } from '../../redux/User/user.actions'
import { clearCart } from '../../redux/Store/store.action'
const mapState = ({ user, store }) => ({
  currentUser: user.currentUser,
  products: store.products,
})

const Navigation = props => {
  const [openmodal, setOpenmodal] = useState()
  const [totalItem, setTotalItem] = useState(0)
  const { currentUser, products } = useSelector(mapState)
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
  // console.log(products)
  // if (products.length > 0) {
  //   const x = products.map(item => item.value).reduce((a, b) => a + b)
  //   console.log(x)
  //   setTotalItem(x)
  // }
  // TODO Need  number 0 as a initial  value when reduce a empty array !
  const x = products.map(item => item.value).reduce((a, b) => a + b, 0)
  console.log(products)
  useEffect(
    () => {
      if (products.length > 0) {
        const j = products.map(item => item.value).reduce((a, b) => a + b, 0)
        setTotalItem(j)
      }
      //  else {
      //   setTotalItem(0)
      // }
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
        <Link to="/" className="menulink-main">
          WeLoveTech
        </Link>
        <button onClick={clearItem}>Clear Cart</button>
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