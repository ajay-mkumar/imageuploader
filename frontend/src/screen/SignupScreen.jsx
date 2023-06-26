import React, { useState } from 'react'
import FormContainer from '../components/FormContainer';
import {Form, Col, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');

    
    const navigate=useNavigate();


    const sendRequest=async()=>{
        const res=await axios.post('/api/user/signup',{
            name,
            email,
            password
        }).catch((err)=>alert(err.response.data.error))

        
        const data= await res.data;
      
        return data;
       
          
        
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(email==='' || password==='' || cpassword===''){
          alert("All fields are required")
      }else{
      if(password!==cpassword){
        alert("password doesn't match")
      }else{
      sendRequest().then((data)=>localStorage.setItem('user',data.user._id)).then(()=>navigate('/home')).catch((err)=>console.log(err));
    }
    }
    }
  return (
    <FormContainer>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name'
             value={name} onChange={(e)=>{setName(e.target.value)}} />
        </Form.Group>
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
            <Form.Group controlId='confirmpassword' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Confirm Password'
            value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}} />
            </Form.Group> 
            <Button className='my-3' variant='primary' type='submit'>signup</Button>
    </Form>
    <Row className='py-3'>
        <Col>
       Already have an account?<Link to={'/'}>login</Link></Col>
    </Row>
</FormContainer>
  )
}

export default SignupScreen