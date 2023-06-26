import axios from 'axios'
import React from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const isLoggedin=localStorage.getItem('user')
  const navigate=useNavigate();
  const logoutHandler=()=>{
    axios.post('/api/user/logout').catch(err=>console.log(err));
    localStorage.removeItem('user')
    navigate('/')

  }
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
<Container>
<LinkContainer to={'/'}>
<Navbar.Brand >Image Uploader</Navbar.Brand>
</LinkContainer>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
  <Nav className="ml-auto">
    
   {isLoggedin &&
   <>
   <LinkContainer to={'/upload'}>
   <Nav.Link>Add images</Nav.Link>
   </LinkContainer>
   <Button onClick={logoutHandler} >logout</Button>
   </>
 }
  </Nav>
</Navbar.Collapse>
</Container>
</Navbar>

</header>
  )
}

export default NavBar