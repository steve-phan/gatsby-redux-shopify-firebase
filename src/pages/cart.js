import React from 'react'

import Cart from '~/components/Cart'
import { Container } from '../../utils/styles'

const CartPage = () => (
  <Container>
    <h2 className="pageHeadline">Your Cart</h2>

    <Cart />
  </Container>
)

export default CartPage
