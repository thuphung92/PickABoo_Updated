import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import { Col, Button, Alert} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { getToken } from '../api/apiClient';
import UserContext from '../context/UserContext';


const loginFormSchema = Yup.object().shape({
    "email": Yup.string().email("Must be a valid e-mail format").required('Required'),
    "password": Yup.string().min(6).required('')
})

const loginFormInitialValues={
    email:'',
    password:''
}

export default class Login extends Component {
    
    constructor(){
        super();
        this.state={
            badLogin:false,
            serverError:false,
            redirect:false,
        }
    }
    
    static contextType = UserContext
    componentDidMount(){
        const {user, setUser} = this.context
    }
    
    handleSubmit=async ({email, password})=>{     
        try {
            const res = await getToken(email, password);
            this.context.setUser(res)
            console.log(this.context.user)
    
            this.setState({redirect:true})
        }
        catch(err) {
            if (err.status ===401){return this.setState({badLogin:true, serverError:false})};
            if (err.status ===500){return this.setState({badLogin:false, serverError:true})};
            return
        }
    }

    render() {

        const styles={
            error:{color:'red'},
            wrapper:{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            container:{
                width: '400px',
                height: '450px',
                padding: '20px 20px 20px 20px',
                border: '0px solid #fff',
                borderRadius: '1rem',
            }
        }
        return (
            <div>                
                {this.state.badLogin?<Alert variant="danger">Invalid Email or Password</Alert>:''}
                {this.state.serverError?<Alert variant="danger">Unexpected error. Please try again!</Alert>:''}
                
                <div className="wrapper" style={styles.wrapper}>
                    <div className="container" style={styles.container}> 
                                                                  
                        {this.state.redirect ? <Redirect to={{pathname:"/" }}/>:''}

                            <Formik 
                                initialValues={loginFormInitialValues}
                                validationSchema={loginFormSchema}
                                onSubmit={(values)=>{console.log(values); this.handleSubmit(values)}}
                                >

                                {({errors, touched})=>(
                                    <Form>
                                        <h2 className="fw-700 display1-size display2-md-size mb-3">Login into <br/> your account</h2>

                                        <label htmlFor="email" className="form-label">Email</label>
                                        <Field name="email" className="form-control"/>

                                        {errors.email && touched.email ? (<div style={styles.error}>{errors.email}</div>):null}

                                        <label htmlFor="password" className="form-label">Password</label>
                                        <Field name="password" className="form-control" type="password"/>
                                                    
                                        {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                                    
                                        <Button className="btn text-center style2-input text-white fw-600 bg-dark border-0 p-1 mt-2 w-100" type="submit">Login</Button>  
                                    </Form>
                                )}
                            </Formik>
                        <Col className="col-sm-12 p-0 text-left">
                            <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Don't have an account? <Link to={{pathname:"/register"}} className="fw-700 ms-1">Register</Link>
                            </h6>
                                    
                        </Col>
                              
                    </div>
                </div>
            </div>
           
        )
    }
}
