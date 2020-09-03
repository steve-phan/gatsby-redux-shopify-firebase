import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import Image from 'gatsby-image'

import { useDispatch, useSelector } from 'react-redux'

import './styles.scss'
import Button from '../../ShareForm/Button'
import { niceUrl } from '../../../utils/node'

import Plus from '../../assets/plus-solid.svg'
import Minus from '../../assets/minus-solid.svg'

import { addItem } from '../../redux/Store/store.action'
import OderBoard from '../OderBoard'

const mapState = ({ store }) => ({
  products: store.products,
})
const ProductGrid = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(mapState)
  const [value, setValue] = useState(1)
  const [testId, setTestId] = useState('')
  const [price, setPrice] = useState(1)
  const [title, setTitle] = useState('')

  let x = 1
  useEffect(() => {
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

  const updateDataPlus = (shopifyId, price) => {
    // setPrice(price)
    setTestId(shopifyId)
    if (testId === shopifyId) {
      setValue(value + 1)
    } else {
      setValue(2)
    }
  }
  const updateDataMinus = (shopifyId, price) => {
    // setPrice(price)
    setTestId(shopifyId)
    if (testId === shopifyId) {
      setValue(value - 1)
    } else {
      setValue(1)
    }
  }
  const addVariantToCart = (shopifyId, price, title) => {
    const itemExits = products.find(item => item.shopifyId === shopifyId)
    console.log(itemExits)
    if (itemExits) {
      shopifyId === testId ? (itemExits.value += value) : (itemExits.value += 1)
      // dispatch(addItem())
    } else {
      // setValue(1)
      products.push({
        shopifyId: shopifyId,
        price: price,
        value: shopifyId === testId ? value : 1,
        title,
      })
    }
    console.log(value)
    // console.log('just clicking')
    // products.push({
    //   shopifyId: testId,
    //   value: value,
    //   price: price,
    // })
    dispatch(addItem(products))
    localStorage.setItem('oderItems', JSON.stringify(products))
  }
  const gotoCart = () => {
    navigate('/cart')
  }

  return (
    <div className="wrap-main">
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
                              updateDataMinus(
                                firstVariant.shopifyId,
                                firstVariant.price,
                                title
                              )
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
                              updateDataPlus(
                                firstVariant.shopifyId,
                                firstVariant.price,
                                title
                              )
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
                          onClick={() => {
                            addVariantToCart(
                              firstVariant.shopifyId,
                              firstVariant.price,
                              title
                            )
                          }}
                        >
                          Add to cart €
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
      <div className="cartSum">
        {products.length > 0 ? (
          <div className="wrap-cartSum" onClick={gotoCart}>
            <p className="totalToItem">
              {products.map(item => item.value).reduce((a, b) => a + b, 0)}
            </p>
            <p className="totalToOder">
              Your Cart
              <span className="totalToPay">
                €
                {products
                  .map(item => item.price * item.value)
                  .reduce((a, b) => a + b, 0)}
              </span>
            </p>
          </div>
        ) : (
          <> </>
        )}
      </div>
      <OderBoard />
    </div>
  )
}

export default ProductGrid
