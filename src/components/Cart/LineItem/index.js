import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      width="100px"
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
    {
      console.log(item.variant.priceV2)
    }
  }
  const totalItemPay = item.quantity * item.variant.priceV2.amount

  return (
    <div>
      <div className="wrapper-LineItem">
        <div className="cartItemImage">
          <Link to={`/product/${item.variant.product.handle}/`}>
            {variantImage}
          </Link>
        </div>

        <div className="titleItem">
          <Link to={`/product/${item.variant.product.handle}/`}>
            {item.title}
          </Link>
        </div>

        {/* {item.variant.title === !'Default Title' ? item.variant.title : ''} */}

        {/* {selectedOptions} */}
        <div className="oderItem">
           Qty: {item.quantity}
          <p className="totalPrice">
          € {totalItemPay}
          </p>
          <span onClick={handleRemove}>delete</span>
        </div>
      </div>
    </div>
  )
}

export default LineItem
