import React from 'react'
import { Card, Col, Row,Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Trash } from 'react-bootstrap-icons'
import axios from 'axios'
const ImageContainer = ({caption,img,id,isUser,name}) => {

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

  const handleClick=()=>{

    navigate(`/home/${id}`)
  }
  

  return (

   
    <Container >
    <Row className="my-3 justify-content-md-center">
        <Col  xs={12} md={6} lg={3} >
    <Card  style={{ width: '18rem' }}>
 
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
             
           
         
            
           <Button variant='none' onClick={handleClick}> <Card.Img src={img}/></Button>
            <Card.Text>{caption}</Card.Text>
        </Card.Body>
   
        </Card>
        </Col>
        </Row>
        </Container>
        
  )
}

export default ImageContainer