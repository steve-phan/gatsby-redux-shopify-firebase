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
    <h2 className="pageHeadline">Welcome to our Restaurant.</h2>
    <ProductGrid />
  </>
)

export default IndexPage
