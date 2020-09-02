import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import './styles.scss'
import Trash from '../../assets/trash.svg'

const mapState = ({ store }) => ({
  products: store.products,
})

const OderBoard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(mapState)
  console.log(products)

  return (
    <div className="wrap-OderBoard">
      {products.length > 0 ? (
        <div className="main-OderBoard">
          {products.map(product => (
            <div className="wrap-OderItem" key={product.shopifyId}>
              <span>{product.value}x </span>
              <p>{product.title} </p>
              <div className="editItem">
                <button className="editItem-minus">-</button>
                <button className="editItem-plus">+</button>
              </div>

              <span> €{product.price * product.value} </span>
              <button className="trash">
                {' '}
                <Trash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No item Added</div>
      )}
    </div>
  )
}

export default OderBoard
