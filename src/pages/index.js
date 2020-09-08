import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`restaurant`, `food`, `asian footd`, `delivery food`]}
    />
    <ProductGrid />
  </>
)

export default IndexPage
