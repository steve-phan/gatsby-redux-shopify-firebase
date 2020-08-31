import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

import { addItem } from '../../redux/Store/store.action'

import './styles.scss'

import Button from '../../ShareForm/Button'

import Plus from '../../assets/plus-solid.svg'
import Minus from '../../assets/minus-solid.svg'

import { useDispatch, useSelector } from 'react-redux'

const mapState = ({ store }) => ({
  products: store.products,
})

const ProductForm = ({ product }) => {
  const shopifyId = product.shopifyId
  const price = product.variants[0].price
  const [quantity, setQuantity] = useState(1)
  const [value, setValue] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const dispatch = useDispatch()
  const { products } = useSelector(mapState)
  console.log(shopifyId)
  const handleAddToCart = () => {
    // setQuantity(quantity + value)
    // dispatch(addItem(products + parseInt(value)))
    // const itemExits = products.find(item => item.shopifyId === shopifyId)
    // const oldValue = itemExits.value || 0

    products.push({
      shopifyId,
      price,
      value: value,
    })
    dispatch(addItem(products))
  }
  useEffect(() => {
    setTotalPrice(price * value)
  }, [value])

  return (
    <>
      <h3>€{product.variants[0].price}</h3>
      <div className="quantity-select">
        <div className="quantity-option">
          <div
            onClick={() => {
              if (value === 1) return
              setValue(value - 1)
            }}
            className="quantity-minus quantity-action"
          >
            <Minus />
          </div>
          <div className="quantity-display">
            <span>{value}</span>
          </div>
          <div
            onClick={() => setValue(value + 1)}
            className="quantity-plus quantity-action"
          >
            <Plus />
          </div>
        </div>
      </div>
      <br />

      <Button type="submit" onClick={handleAddToCart}>
        €{totalPrice}
      </Button>
    </>
  )
}

export default ProductForm
