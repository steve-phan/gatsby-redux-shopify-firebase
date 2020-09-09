import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../redux/Store/store.action'

import './styles.scss'
import Trash from '../../assets/trash.svg'
import { set } from 'lodash'
import Button from '../../ShareForm/Button'

const mapState = ({ store }) => ({
  products: store.products,
})

const OderBoard = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [shopifyId, setShopifyId] = useState('')

  const { products } = useSelector(mapState)
  const handlePlusAction = product => {
    const item = products.find(item => item.shopifyId === product.shopifyId)
    console.log(item.value)
    item.value += 1
    dispatch(addItem(products))
    localStorage.setItem('oderItems', JSON.stringify(products))
    // setValue(item.value + 1)
    // console.log(value)
  }
  const handleMinusAction = product => {
    const item = products.find(item => item.shopifyId === product.shopifyId)

    if (item.value === 1) {
      const newProducts = products.filter(
        item => item.shopifyId !== product.shopifyId
      )
      dispatch(addItem(newProducts))
      localStorage.setItem('oderItems', JSON.stringify(newProducts))
    } else {
      item.value -= 1
      dispatch(addItem(products))
      localStorage.setItem('oderItems', JSON.stringify(products))
    }
  }
  const removeOderItem = product => {
    const item = products.find(item => item.shopifyId === product.shopifyId)
    const newProducts = products.filter(
      item => item.shopifyId !== product.shopifyId
    )
    dispatch(addItem(newProducts))
    localStorage.setItem('oderItems', JSON.stringify(newProducts))
  }
  // useEffect(() => {
  //   // setValue(product.value)
  // }, [value, shopifyId])
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  return (
    <div className="wrap-OderBoard">
      {products.length > 0 ? (
        <div className="main-OderBoard">
          {products.map(product => (
            <div className="wrap-OderItem" key={product.shopifyId}>
              <span className="value-OderItem">
                {shopifyId === product.shopifyId ? value : product.value}x{' '}
              </span>
              <p>{product.title} </p>
              <div className="editItem">
                <button
                  onClick={() => {
                    handleMinusAction(product)
                  }}
                  className="editItem-minus"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    handlePlusAction(product)
                  }}
                  className="editItem-plus"
                >
                  +
                </button>
              </div>

              <span className="total-OderItem">
                €
                {shopifyId === product.shopifyId
                  ? (value * product.price).toFixed(2)
                  : (product.price * product.value).toFixed(2)}
              </span>
              <button
                onClick={() => {
                  removeOderItem(product)
                }}
                className="trash"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="noItemAdded">
          <p>Ihr warenkorb ist leer</p>

          <p>Wähle leckere Gerichte aus der Menu !</p>

          <p> Mindestbestellwert von 12,00 € (Versandkostenlos)</p>
        </div>
      )}
    </div>
  )
}

export default OderBoard
