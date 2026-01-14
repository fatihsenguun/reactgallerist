import React from 'react'
import "../css/comHeader.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router';

function Header1() {

    const navigate = useNavigate();

const logOut =()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken");
 
navigate("/login")
}



    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/" className="brand-logo">
             <img className='logo' src='https://i.hizliresim.com/j3q82tu.jpg'/>
                    Spring<span className="brand-dot">.</span>Galerist
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links-container">
                        <Nav.Link href="/" className="nav-item-link">Home</Nav.Link>
                        <Nav.Link href="/carfinder" className="nav-item-link">Car Finder</Nav.Link>
                        <Nav.Link href="/description" className="nav-item-link">Description Generator</Nav.Link>
                        <Nav.Link href="/cars" className="nav-item-link">Inventory</Nav.Link>
                        <Nav.Link href="/employee" className="nav-item-link">Employee</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                   <Button onClick={logOut} className='btn' variant="danger">Log out</Button>
            </Container>
              
        </Navbar>
    )
}

export default Header1;