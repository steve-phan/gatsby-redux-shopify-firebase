import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'
import Home from '../components/Home'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`restaurant`, `food`, `asian footd`, `delivery food`]}
    />
    <Home />
    {/* <ProductGrid /> */}
  </>
)

export default IndexPage
