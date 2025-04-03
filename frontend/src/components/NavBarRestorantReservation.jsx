import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { PRODUKCIJA, RouteNames } from '../constants';


export default function NavBarRestorantReservation() {
    const navigate = useNavigate();

    function OpenSwaggerURL() {
        window.open(PRODUKCIJA + "/swagger/index.html", "_blank");
    }

    return (
        <Navbar expand="lg" className="custom-navbar">
          <Container fluid>
            <Navbar.Brand href="/" className="navbar-logo">
              <span>Restorant</span> Manager Reservation <span className="app-name">APP</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-links">
                <Nav.Link 
                  onClick={() => navigate(RouteNames.HOME)} 
                  className="navbar-link"
                >
                  Početna
                </Nav.Link>
                <NavDropdown 
                  title="Programi" 
                  id="basic-nav-dropdown" 
                  className="navbar-link"
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    onClick={() => navigate(RouteNames.GOST_PREGLED)}
                    className="dropdown-item-custom"
                  >
                    Gosti
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    onClick={() => navigate(RouteNames.STOL_PREGLED)}
                    className="dropdown-item-custom"
                  >
                    Stolovi
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    onClick={() => navigate(RouteNames.REZERVACIJA_PREGLED)}
                    className="dropdown-item-custom"
                  >
                    Rezervacije
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    onClick={() => navigate(RouteNames.JELOVNIK_PREGLED)}
                    className="dropdown-item-custom"
                  >
                    Jelovnik
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    onClick={() => navigate(RouteNames.NARUDZBA_PREGLED)}
                    className="dropdown-item-custom"
                  >
                    Narudžba
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link 
                  onClick={() => OpenSwaggerURL()} 
                  className="navbar-link"
                >
                  Swagger
                </Nav.Link>
                <Nav.Link 
                  onClick={() => navigate(RouteNames.ERA)} 
                  className="navbar-link"
                >
                  ERA dijagram
                </Nav.Link>
              </Nav>
              <Nav className="navbar-user">
                <Nav.Link 
                  onClick={() => navigate(RouteNames.LOGIN)} 
                  className="navbar-button"
                >
                  Prijava
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}