import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class Carousel extends Component {

    state= { 
        active: 0
    }

    static defaultProps={
        media: ['https://res.cloudinary.com/dci7rk8xe/image/upload/v1631432062/react_myboo/no-image-300X300_fu0uq0.png']
    }

    handleIndexClick = event => {
        this.setState({
            active: +event.target.dataset.index //turns a string into a number
        })
    }
    
    render() {
        const { active } = this.state;
        const photos = this.props.media.length?
            this.props.media.map((item) => { return item.medium? item.medium: item.full })
            : [];
        return (
            <div className="carousel">
                <div className='text-center mb-4'>
                    <img src={photos[active]} alt="primary animal" />
                </div>
                <div className="carousel-smaller text-center">
                    <Container className='mt-5 mb-3'>
                        <Row>
                            {photos.map((photo, index) => (
                                <Col md={2} key={photo}>
                                <img
                                    onClick={this.handleIndexClick}
                                    key={photo} src={photo}
                                    className = { index === active ? 'active' : '' }
                                    alt='animal thumbnail'
                                    data-index = {index}
                                    style={{height: '100px', width:'100%', objectFit:'contain'}}
                                />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
