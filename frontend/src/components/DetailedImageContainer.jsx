import axios from 'axios'
import React from 'react'
import { Card, Col, Row,Container, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'



const DetailedImageContainer = ({caption,img,isUser,id,name}) => {
  const navigate=useNavigate();

  const deleteRequest=async(id)=>{
    const res =await axios.delete(`/api/post/delete/${id}`).catch(err=>alert(err.res.data.error))

    const data=await res.data;

    return data;
  }

  const handleDelete=async()=>{
   if(window.confirm("do you want to delete this?")){
    deleteRequest(id).then(data=>{
      alert(data.data);
    }).then(()=>navigate('/home')).catch(err=>console.log(err))
   
   }
  }

  
  return (

   
    <Container >
    <Row className="my-3 justify-content-md-center">
        <Col lg={8} >
    <Card  style={{ width: '100%' }}>
 
        <Card.Body>
        <Row >
          <Col>
            <Card.Title>{name}
            
             </Card.Title></Col>
             {isUser &&
           <Col className='justify-content-end' lg={3}>

          <Button onClick={handleDelete} variant='outline-danger'>   
         <Trash   size={15} />
         </Button> 
         </Col>}
          
         </Row>
         <Row className='my-3'>
             <Col>
          <Card.Img src={img}/>
          </Col>
          </Row>
          <Row className='ml-3'>
          <Col>
            <Card.Text>{caption}</Card.Text>
            </Col>
            </Row>
        </Card.Body>
   
        </Card>
        </Col>
        </Row>
        </Container>
        
  )
}

export default DetailedImageContainer