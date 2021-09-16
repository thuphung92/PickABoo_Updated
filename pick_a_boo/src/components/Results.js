import React from 'react'
import Pet from '../views/Pet'
import { Container, Row, Col } from 'react-bootstrap';

const Results = ({ pets }) => {
    return (
        
        <div className="search">
            
            {!pets.length ? (
                <Container className='text-center'>
                    <span><h2>No Pet Found</h2></span>
                </Container>
            ) : (
                <Container>
                    <Row className='show-grid'>
                        {pets.map((pet) => (
                            <Col md={3} key={pet.id}>
                            <Pet
                                key = {pet.id} 
                                animal = {pet.type}
                                name = {pet.name}
                                breed = {pet.breeds.primary}
                                location = {`${pet.contact.address.city}, ${pet.contact.address.state}`}
                                id = {pet.id}
                                distance = {Math.ceil(pet.distance * 10)/10}
                                photos = {pet.primary_photo_cropped !== null? pet.primary_photo_cropped.small : null}
                            />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}  
                 
        </div>
    )
}

export default Results
