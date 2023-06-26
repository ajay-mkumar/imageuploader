import React, { useState } from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const UploadScreen = () => {
    const [caption,setCaption]=useState('');
    const [image,setImage]=useState('');
    
    const navigate=useNavigate();
    const convertintobase=(e)=>{
        var reader=new FileReader();
        if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
          setImage(reader.result)
        }
       }
      }

      const sendRequest=async()=>{
        await axios.post('/api/post/upload',{
          caption,
          image,
        
        }).catch(err=>alert(err.response.data.error))
      }

    const submitHandler=(e)=>{
        e.preventDefault();
        sendRequest().then(()=>navigate('/home'))
    }
    
  return (
    <FormContainer>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='caption' className='my-3'>
            <Form.Label>Caption</Form.Label>
            <Form.Control type='text' placeholder='say something...'
             value={caption} onChange={(e)=>{setCaption(e.target.value)}} />
        </Form.Group>
        <Form.Group controlId="file" className="mb-3">
        <Form.Label>Upload Your Image</Form.Label>
        <Form.Control  type="file" onChange={convertintobase} />
      </Form.Group>
            <Button className='my-3' variant='primary' type='submit'>upload</Button>
    </Form>
</FormContainer>
  )
}

export default UploadScreen