import './store.types'
import storeTypes from './store.types'

export const addItem = num => ({
  type: storeTypes.PLUS_ITEM,
  payload: num,
})
export const clearCart = () => ({
  type: storeTypes.CLEAR_CART,
  payload: [],
})
