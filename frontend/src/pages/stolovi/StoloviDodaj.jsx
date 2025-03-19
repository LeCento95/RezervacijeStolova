import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import StolService from "../../services/StolService";

export default function StoloviDodaj() {
  const navigate = useNavigate();

  async function dodaj(stol) {
    try {
      const odgovor = await StolService.dodaj(stol);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.STOL_PREGLED);
    } catch (error) {
      console.error("Greška pri dodavanju stola:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();

    let podaci = new FormData(e.target);

    dodaj({
      brojStola: parseInt(podaci.get("brojStola")),
      kapacitet: parseInt(podaci.get("kapacitet")),
      lokacija: podaci.get("lokacija"),
    });
  }

  return (
    <>
      <h2 className="naslov">Dodavanje stola</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="brojStola">
          <Form.Label>Broj stola</Form.Label>
          <Form.Control type="number" name="brojStola" required />
        </Form.Group>

        <Form.Group controlId="kapacitet">
          <Form.Label>Kapacitet</Form.Label>
          <Form.Control type="number" name="kapacitet" required />
        </Form.Group>

        <Form.Group controlId="lokacija">
          <Form.Label>Lokacija</Form.Label>
          <Form.Control type="text" name="lokacija" />
        </Form.Group>

        <hr />

        <Row>
          <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
            <Link to={RouteNames.STOL_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
            <Button variant="success" type="submit" className="siroko">
              Dodaj stol
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}