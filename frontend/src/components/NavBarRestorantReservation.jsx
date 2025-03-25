import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { PRODUKCIJA, RouteNames } from '../constants';



export default function NavBarRestorantReservation(){

    const navigate = useNavigate(); // ; u pravilu i ne treba

    function OpenSwaggerURL(){
        window.open(PRODUKCIJA + "/swagger/index.html", "_blank");
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/">Restoran Manager Reservation APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate(RouteNames.HOME)}>Početna</Nav.Link>
              <NavDropdown title="Programi" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate(RouteNames.GOST_PREGLED)}>Gosti</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RouteNames.STOL_PREGLED)}>
                  Stolovi
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RouteNames.REZERVACIJA_PREGLED)}>Rezervacije</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => OpenSwaggerURL()}>Swagger</Nav.Link>
              <Nav.Link onClick={() => navigate(RouteNames.LOGIN)}>Prijava</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }