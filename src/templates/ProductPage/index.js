import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'

import './styles.scss'
const ProductPage = ({ data }) => {
  const product = data.shopifyProduct

  console.log(product)
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div className="container-ProductPage">
        <div className="twocolumgrid">
          <div className="gridleft">
            {product.images.map(image => (
              <Image
                className="image-ProductPage"
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={product.title}
              />
            ))}
          </div>
          <div className="gridright">
            <h2 className="productTitle">{product.title}</h2>
            {/* <div
              className="ProductDescription"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            /> */}
            <ProductForm product={product} />
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
//* two cury bracket

export default ProductPage
