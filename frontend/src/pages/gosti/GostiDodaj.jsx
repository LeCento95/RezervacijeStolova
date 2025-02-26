import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import GostService from "../../services/GostService";

export default function GostiDodaj() {
  const navigate = useNavigate();

  async function dodaj(gost) {
    try {
      const odgovor = await GostService.dodaj(gost);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.GOST_PREGLED);
    } catch (error) {
      console.error("Greška pri dodavanju gosta:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();

    let podaci = new FormData(e.target);

    dodaj({
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      brojTelefona: podaci.get("brojTelefona"),
      email: podaci.get("email"),
    });
  }

  return (
    <>
      <h2 className="naslov">Dodavanje gosta</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="ime" required />
        </Form.Group>

        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="text" name="prezime" required />
        </Form.Group>

        <Form.Group controlId="brojTelefona">
          <Form.Label>Broj Telefona</Form.Label>
          <Form.Control type="number" name="brojTelefona" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" />
        </Form.Group>

        <hr />

        <Row>
          <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
            <Link to={RouteNames.GOST_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
            <Button variant="success" type="submit" className="siroko">
              Dodaj gosta
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}