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
              description
              productType
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
  // Productyes : beliebte , suppen, vorspeisen , salat ,  reisundnudeln , mitente, mitschwein, mithuhn, mitrind, vegetarian ,

  // console.log(beliebte)

  // const beliebte = allShopifyProduct.filter(
  //   item => item.productType === 'beliebete'
  // )
  // console.log(beliebte)

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
  const ProductList = ({
    node: {
      id,
      handle,
      title,
      description,
      images: [firstImage],
      variants: [firstVariant],
    },
  }) => {
    return (
      <div className="product-grid" key={id}>
        <Link to={`/product/${niceUrl(handle)}/`}>
          {firstImage && firstImage.localFile && (
            <div className="wrap-image">
              <Image
                className="image-ProductGrid"
                fluid={firstImage.localFile.childImageSharp.fluid}
                alt={handle}
              />
            </div>
          )}
        </Link>
        <Link to={`/product/${niceUrl(handle)}/`}>
          <span className="title-productGrid">{title}</span>
          <p className="item-description"> {description && description}</p>
          {}
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
                  <span>{testId === firstVariant.shopifyId ? value : 1}</span>
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
                  ? (firstVariant.price * value).toFixed(2)
                  : firstVariant.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="wrap-main">
      <div className="menu-main-wrap">
        <div className="menu-main">
          <h3>Speise Cart</h3>
          <ul className="menubar-list">
            <li>
              {' '}
              <Link to="#beliebte">Beliebte Gerichte</Link>{' '}
            </li>
            <li>
              <Link to="#suppen">Suppen</Link>
            </li>
            <li>
              <Link to="#salat"> Salat </Link>
            </li>
            <li>
              <Link to="#vorspeisen">Vorspeisen</Link>
            </li>
            <li>
              <Link to="#reisundnudeln">Gerichte mit Reis und Nudeln</Link>
            </li>
            <li>
              <Link to="#mitente">Gerichte mit Ente</Link>
            </li>
            <li>
              <Link to="#mitschwein">Gerichte mit Schweinefleisch</Link>
            </li>
            <li>
              <Link to="#mithuhn">Gerichte mit Hühnerfleisch</Link>
            </li>
            <li>
              {' '}
              <Link to="#mitrind">Gerichte mit Rindfleisch</Link>
            </li>

            <li>
              <Link to="#vegetarian">Vegetarische Gerichte</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrraper-productGrid">
        <h1>Beliebte Gerichte</h1>
        <section id="beliebte" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'beliebte')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Suppen</h1>
        <section id="suppen" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'suppen')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>VorSpeisen</h1>
        <section id="vorspeisen" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'vorspeisen')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Salat</h1>
        <section id="salat" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'salat')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Gerichte mit Reis und Nudeln</h1>
        <section id="reisundnudeln" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'reisundnudeln')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Gerichte mit Ente</h1>
        <section id="mitente" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'mitente')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Gerichte mit Schweinefleisch</h1>
        <section id="mitschwein" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'mitschwein')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Gerichte mit Hühnerfleisch</h1>
        <section id="mithuhn" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'mithuhn')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Gerichte mit Rindfleisch</h1>
        <section id="mitrind" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'mitrind')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
        <h1>Vegetarische Gerichte</h1>
        <section id="vegetarian" className="productType">
          {allShopifyProduct.edges
            .filter(item => item.node.productType === 'vegetarian')
            .map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  description,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              }) => {
                return (
                  <div key={id}>
                    {ProductList({
                      node: {
                        id,
                        handle,
                        title,
                        description,
                        images: [firstImage],
                        variants: [firstVariant],
                      },
                    })}
                  </div>
                )
              }
            )}
        </section>
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
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </span>
              </p>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>

      <div className="oderDetails">
        <div className="oderDetails-main">
          <OderBoard />
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
