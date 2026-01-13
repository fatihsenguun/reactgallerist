import React from 'react'
import "../css/comHeader.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';

function Header1() {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/" className="brand-logo">
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
                   <Button className='btn' variant="danger">Log out</Button>
            </Container>
              
        </Navbar>
    )
}

export default Header1;