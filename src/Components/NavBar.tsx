import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav>
      <Navbar
        sticky="top"
        expanded={expanded}
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            onClick={() => setExpanded(false)}
            to="/products"
          >
            GoPos exercise
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setExpanded((state) => !state)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={() => setExpanded(false)} className="me-auto">
              <Nav.Link as={Link} to="/products">
                Products list
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/edit-products">
                Edit products
              </Nav.Link>
              <Nav.Link as={Link} to="/edit-categories">
                Edit categories
              </Nav.Link>
              <Nav.Link as={Link} to="/new-product">
                Add new product
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default NavBar;
