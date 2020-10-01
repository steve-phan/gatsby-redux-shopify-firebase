import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Provider, useDispatch } from 'react-redux'

import { getCurrentUser } from './../firebase/utils'

import { checkUserSession } from './../redux/User/user.actions'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle } from '../../utils/styles'
import Navigation from '~/components/Navigation'

import { store } from './../redux/createStore'
import './styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 80px 1.0875rem 1.45rem;
`

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])
  return (
    <Provider store={store}>
      <ContextProvider>
        <GlobalStyle />
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <>
              <Navigation siteTitle={data.site.siteMetadata.title} />
              <div className="wrapper-layout">
                <div className="wrapper-main">{children}</div>
                <footer>
                  <span>© {new Date().getFullYear()}, Dexemnao</span>
                </footer>
              </div>
            </>
          )}
        />
      </ContextProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
