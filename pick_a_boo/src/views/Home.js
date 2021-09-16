import React from 'react';
import useBreedList from '../components/useBreedList';
import useAnimalList from '../components/useAnimalList';
import { useState, useEffect, useContext } from 'react';
import { Client } from '@petfinder/petfinder-js';
import Results from '../components/Results';
import { Form, Row, Container, Col, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';


const client = new Client({apiKey: process.env.REACT_APP_API_KEY, secret: process.env.REACT_APP_API_SECRET});

const Home = () => {
    const [location, setLocation] = useState('Orange, CA');
    const [animal, setAnimal] = useState('');
    const [breed, setBreed] = useState('');
    const [pets, setPets] = useState([]);
    const [animals] = useAnimalList();
    const [breeds] = useBreedList(animal);
    const [errStatus, setErrStatus] = useState(null);

  
    useEffect(() => {
        getPets();
    },[])
    
    async function getPets() {
        
        try {
            const resp = await client.animal.search({
                type: `${animal}`,
                location: `${location}`,
                breed: `${breed}`,
                status: 'adoptable',
                sort: 'distance'           
            });
            setPets(resp.data.animals);
        }
        catch (err) {
            if(400 <= err.status < 500) {setErrStatus(400)}
            else if(500 <= err.status < 600 ) {setErrStatus(500)}
            else {console.error(err.status)}
            return
        }
        
    }

const styles={
            error:{color:'red'},
            wrapper:{
                marginTop: '220px',
                marginBottom: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            box:{
                width: '700px',
                height: '90px',
                padding: '10px 10px 10px 20px',
                border: '0px solid #fff',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,.7)'
            }
        }

    return (
        <div className="search-params">         
            {errStatus === 400 && <Alert variant = 'danger'>Please Enter A Valid Location!<br/> Tips: A valid Zip Code is also acceptable!</Alert>}
            {errStatus === 500 && <Alert variant = 'info'>There was an error happen while trying to connect to the server. Please try again.</Alert>}

            <Card className="bg-dark text-black ">
                <Card.Img src="https://res.cloudinary.com/dci7rk8xe/image/upload/c_crop,h_250,w_1100/v1631606822/react_myboo/6_nar5sx.jpg" alt="Card image" />
                
                <Card.ImgOverlay>                   
                <div className="wrapper" style={styles.wrapper}>
                    <div className="box" style={styles.box}> 
                <Form
                    onSubmit = {e => {
                        e.preventDefault();
                        getPets();
                    }}
                >
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="location" className='fw-bold'>
                                Location
                                <Form.Control
                                    id='location'
                                    onChange={e => setLocation(e.target.value)} 
                                    value={location} 
                                    placeholder="Location">
                                </Form.Control>
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="animal" className='fw-bold'>
                                Animal
                                <Form.Control
                                    as="select"
                                    id="animal"
                                    value={animal}
                                    onChange={e => setAnimal(e.target.value)}
                                    onBlur={e => setAnimal(e.target.value)}
                                >
                                    <option/>
                                    {
                                        animals.map(animal => (
                                            <option value={animal} key={animal}>
                                                {animal}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                        <Form.Label htmlFor="breed" className='fw-bold'>
                            Breed
                            <Form.Control
                                as="select"
                                id="breed"
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                                onBlur={e => setBreed(e.target.value)}
                            >
                                <option/>
                                {breeds.map(breed => (
                                        <option value={breed} key={breed}>
                                            {breed}
                                        </option>
                                ))}
                            </Form.Control>
                        </Form.Label>
                        </Form.Group>
                    </Row>
                    <Button variant="warning" type="submit">Submit</Button >
                </Form>
                </div>
                </div>
                </Card.ImgOverlay>
            </Card>

            <div style={{marginTop: '50px'}}>                        
                <Container className='text-center' style={{ marginTop:'50px'}}>
                    <h1>Who's Gonna Be Your New Boo?</h1>                   
                </Container>
            </div>

            <div style={{marginTop: '50px'}}>
                <Results pets={pets} />
            </div>

        </div>
    )
}

export default Home