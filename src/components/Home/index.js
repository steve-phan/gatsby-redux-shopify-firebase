import React from 'react'
import { Carousel, Button, Container, Row, Col, Card } from 'react-bootstrap'

import './styles.scss'

const Home = () => {
  return (
    <div>
      <Carousel className="wrap-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1505276452202-6df1db49945a?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Write cool thing here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1464&q=80"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Write cool thing here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1548586832-45302f8374ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1417&q=80"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Write cool thing here</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="main-container">
        <h1>hello from main container</h1>
      </div>
    </div>
  )
}

export default Home
