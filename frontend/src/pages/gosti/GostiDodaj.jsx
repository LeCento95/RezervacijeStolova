import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import GostService from "../../services/GostService";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function GostiDodaj() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  async function dodaj(e) {
    showLoading();
    const odgovor = await GostService.dodaj(e);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.GOST_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      brojTelefona: podaci.get("brojTelefona"),
      email: podaci.get("email"),
    });
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h1>Dodavanje gosta</h1>
        <Form onSubmit={obradiSubmit}>
          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="brojTelefona">
            <Form.Label>Broj telefona</Form.Label>
            <Form.Control type="text" name="brojTelefona" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Dodaj
          </Button>
          <Link to={RouteNames.GOST_PREGLED} className="btn btn-secondary ms-2">
            Odustani
          </Link>
        </Form>
      </Col>
    </Row>
  );
}