import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Client } from '@petfinder/petfinder-js';
import Carousel from '../components/Carousel';
import ErrorBoundary from '../ErrorBoundary';
import { Spinner, Card, Row, Col, Container, } from 'react-bootstrap'
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import UserContext from '../context/UserContext';

const client = new Client({apiKey: process.env.REACT_APP_API_KEY, secret: process.env.REACT_APP_API_SECRET});

class Details extends Component {
    state = {
        loading: true,
        liked: false
    };

    static contextType = UserContext
 
    async componentDidMount() {
        
        const resp = await client.animal.show(this.props.match.params.id)
        const pet = resp.data.animal
        
        let breed;
        if (pet.breeds.unknown) {
            breed = 'unknown'
        } else if (pet.breeds.mixed === true) {
            breed = `${pet.breeds.primary}, ${pet.breeds.secondary}`
        } else {
            breed = pet.breeds.primary
        }
        
        this.setState({
            name : pet.name,
            animal: pet.type,
            location: `${pet.contact.address.city}, ${pet.contact.address.state}`,
            age: pet.age,
            size: pet.size,
            gender: pet.gender,
            description: pet.desciption? pet.description: "This information hasn't been updated yet.",
            houseTrained: pet.attributes.house_trained === true ? "Yes" : "No",
            breed,
            media: pet.photos,
            contact: pet.contact,
            id : pet.id,
            loading: false
        });
        const {user} = this.context

        //const currentLocation ={
            //pathname:'/login',
            //state: {from: this.props.location.pathname}
        //}
    }

    toggle = () => {
        //display heart color
        let localLike = this.state.liked;
        localLike = !localLike;
        this.setState({liked: localLike})

    }


    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Container className='text-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Container>
                </div>
            ) 
        }

        const { name, animal, breed, age, size, gender, description, location, houseTrained, media, contact } = this.state;

        const styles={
            btn:{
                height: 'auto',
                width: 'auto',
                border: 'none',
                backgroundColor:'white',
                float: 'right'
            }
        }
       
        return (
            <div className='details mt-5'>
                <Row>
                    <Col md={4}>
                        <div className='mt-5'>
                        <Carousel media={media}/>
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <div className='detail-box mb-5'>    
                            <Card style={{padding: '50px'}}>
                                <div style={{paddingBottom: '20px'}}>
                                    <h1 className='mb-3'>{name}</h1>
                                    <h3>{animal} - {breed} - {location} </h3>  
                                </div>
                                <hr/>
                                <div>
                                    <h4>{age} - {gender} - {size}</h4>
                                </div>
                                <hr/>
                                <div style={{paddingBottom: '30px', paddingTop: '30px'}}>
                                    <h2 className='mb-5'>About</h2>
                                    <div className='mb-5'>
                                        <h4>CHARACTERISTICS</h4>
                                        {description}
                                    </div>
                                    <div className='mb-5'>
                                        <h4>HOUSE-TRAINED</h4>
                                        { houseTrained }
                                    </div>
                                    <div>
                                        <h4>CONTACT</h4>
                                            {Object.entries(this.context.user).length?
                                                <>
                                                    <div>
                                                        <MailOutlineIcon/> {contact.email}
                                                    </div>
                                                        <CallIcon/> {contact.phone}
                                                </>
                                            :
                                            <p>
                                                Please <Link to={{pathname:"/login", state: {from: this.props.location.pathname}}}>Login</Link> to View This Information!
                                            </p>}
                                    </div>
                                </div>
                                    <span >
                                        <button
                                            style={styles.btn}
                                            onClick={()=>this.toggle()}
                                        >
                                            <FavoriteIcon
                                                color={this.state.liked? "secondary" : "disabled"}
                                                
                                            />
                                        </button>
                                    </span>
                            </Card>
                        </div>
                    </Col>
                   
                </Row>          
            </div>
        )
    }
}


const DetailsWithRouter = withRouter(Details)

export default function DetailsWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <DetailsWithRouter />
        </ErrorBoundary>
    )
};

