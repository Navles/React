import React from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <div className="fw-bold">
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <Navbar.Brand href="#"> React CRUD Operation </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="#action1">About</Nav.Link>
              <Nav.Link href="#action2">Contact</Nav.Link>
              <Nav.Link href="reduxcreate">Redux</Nav.Link>

              <NavDropdown title="Hooks With API" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/ustable">Use State</NavDropdown.Item>
                <NavDropdown.Item href="/usereducertable">Use Reducer</NavDropdown.Item>
                <NavDropdown.Item href="/UseContextTable">Use Context</NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action6">
                  Something else here
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
