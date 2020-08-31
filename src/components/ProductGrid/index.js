import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import './styles.scss'
import Button from '../../ShareForm/Button'
import { niceUrl } from '../../../utils/node'

const ProductGrid = () => {
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
                shopifyId
              }
            }
          }
        }
      }
    `
  )

  return (
    <div className="wrraper-productGrid">
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
            },
          }) => (
            <div className="product-grid" key={id}>
              <Link to={`/product/${niceUrl(handle)}/`}>
                {firstImage && firstImage.localFile && (
                  <Image
                    className="image-ProductGrid"
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <Link to={`/product/${niceUrl(handle)}/`}>
                <span className="title-productGrid">{title}</span>
              </Link>
              <div className="fastbuy-btn">
                <span className="pricetag-productGrid">
                  €{firstVariant.price}
                </span>
                <Button
                // onClick={() => addVariantToCart(firstVariant.shopifyId, 1)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  )
}

export default ProductGrid
