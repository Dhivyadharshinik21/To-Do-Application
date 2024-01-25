import React from 'react';
import { Navbar ,Nav, Button, Card,Row,Col, InputGroup} from 'react-bootstrap';
import woodenimg from "../images/woodenimg.jpg";
import giphy from "../images/giphy.gif";
import { BiCategory } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";


function Home() {
  const username=sessionStorage.getItem("username")
  return (
    <div  >
        <div className='navbar'>
    <Navbar >
    <Navbar.Brand href='/#home'><span className='nav_brand'>Home</span></Navbar.Brand>
    <Nav>
    <Nav.Link href="/category" className='nav_link'> <Button variant="outline-info" >Category</Button></Nav.Link>
    <Nav.Link href="/client"  className='nav_link2'><Button variant="outline-info" >Client</Button></Nav.Link>
    <Nav.Link href="/loginpage" className='nav_link3'><Button variant="outline-info" >Logout</Button></Nav.Link>
    </Nav>
    </Navbar>
      </div>
      <div style={{ backgroundImage: `url(${giphy})`}} className='home_background'>
        <Row>
          <Col md='4'></Col>
          <Col md="4">
            <div className='dashboard'>
            <h1 >WELCOME {username}</h1>
            
            <a href="/category" className='list_icon'><BiCategory /></a>
            <a href="/client" className='list_icon2'><FaRegUserCircle /></a>
            </div>
          </Col>
          <Col md='4'></Col>
        
       
        
        
        </Row>
      </div>
    </div>
  )
}

export default Home
