import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './Header.scss';

const Header: React.FC = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home"><span id="logo-title">LostPaws</span></Navbar.Brand>
      <Nav className="mr-auto">
      </Nav>
      <Button id="header-button" variant="outline-primary">Report Lost Pet</Button>
      <Button variant="outline-primary">Search</Button>
    </Navbar>
  </>
);

export default Header;
