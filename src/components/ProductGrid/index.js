import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import { useDispatch, useSelector } from 'react-redux'

import './styles.scss'
import Button from '../../ShareForm/Button'
import { niceUrl } from '../../../utils/node'

import Plus from '../../assets/plus-solid.svg'
import Minus from '../../assets/minus-solid.svg'
import { set } from 'lodash'

const mapState = ({ store }) => ({
  products: store.products,
})
const ProductGrid = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(mapState)
  const [value, setValue] = useState(1)
  const [testId, setTestId] = useState('')
  console.log(value)
  let x = 1
  useEffect(() => {
    console.log(x)
    return () => {}
  }, [testId, value])
  const handlePlus = () => {
    // products.push()
  }

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

  const updateDataPlus = e => {
    if (testId === e) {
      setValue(value + 1)
    } else {
      setTestId(e)
      setValue(2)
    }
    console.log(e)
    console.log(`render ${x}`)
  }
  const updateDataMinus = e => {
    if (testId === e) {
      setValue(value - 1)
    } else {
      setTestId(e)
      setValue(1)
    }
  }
  console.log(testId)

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
          }) => {
            return (
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
                  <div className="optionItem">
                    {/* <h3>€{product.variants[0].price}</h3> */}
                    <div className="quantity-select">
                      <div className="quantity-option">
                        <div
                          onClick={() => {
                            if (value === 1) return
                            updateDataMinus(firstVariant.shopifyId)
                          }}
                          className="quantity-minus quantity-action"
                        >
                          <Minus />
                        </div>
                        <div className="quantity-display">
                          <span>
                            {testId === firstVariant.shopifyId ? value : 1}
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            console.log(testId)
                            updateDataPlus(firstVariant.shopifyId)
                          }}
                          className="quantity-plus quantity-action"
                        >
                          <Plus />
                        </div>
                      </div>
                    </div>
                    <div className="addCartBtn">
                      <Button
                      // onClick={() => addVariantToCart(firstVariant.shopifyId, 1)}
                      >
                        €
                        {testId === firstVariant.shopifyId
                          ? firstVariant.price * value
                          : firstVariant.price}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        )
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  )
}

export default ProductGrid

// const expandOder = () => {
//   var coll = document.getElementsByClassName('collapsible')
//   for (let i = 0; i < coll.length; i++) {
//     coll[i].addEventListener('click', function() {
//       this.classList.toggle('active')
//       const content = this.nextElementSibling
//       if (content.style.maxHeight) {
//         console.log('max-height is leng')
//         content.style.maxHeight = null
//       } else {
//         var x = document.getElementsByClassName('optionItem')
//         for (var i = 0; i < x.length; i++) {
//           x[i].style.maxHeight = null
//         }
//         content.style.maxHeight = content.scrollHeight + 'px'
//       }
//     })
//   }
// }
