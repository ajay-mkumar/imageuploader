import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const LoginScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();


    const sendRequest=async()=>{
        const res=await axios.post('/api/user/login',{
            email,
            password
        }).catch((err)=>alert(err.response.data.error))
        
        return await res.data;
    
        
    }


    const submitHandler=async(e)=>{
        e.preventDefault();
        if(email==='' || password===''){
            alert("Please Enter Email and Password")
        }else{
        sendRequest().then((data)=>localStorage.setItem('user',data.user._id)).then(()=>navigate('/home')).catch((err)=>console.log(err));
    }
    }
    
     
    
  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Email'
                 value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password'
                value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Group> 
                <Button className='my-3' variant='primary' type='submit'>login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Don't have an account?<Link to={'/signup'}>Signup</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen