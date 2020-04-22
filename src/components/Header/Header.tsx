import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './Header.scss';
import { FaUser } from "react-icons/fa";

const Header: React.FC = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand><span id="logo-title">LostPaws</span></Navbar.Brand>
      <Nav className="mr-auto">
      </Nav>
      <Button id="header-button" variant="outline-primary">Report</Button>
      <Button id="header-button" variant="outline-primary">Search</Button>
      <Button variant="outline-primary"><FaUser /></Button>
    </Navbar>
  </>
);

export default Header;
