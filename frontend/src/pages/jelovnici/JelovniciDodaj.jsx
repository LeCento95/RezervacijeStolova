import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { RouteNames } from "../../constants";
import Service from "../../services/JelovnikService";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function JelovniciDodaj() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  async function dodaj(e) {
    showLoading();
    const odgovor = await Service.dodaj(e);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.JELOVNIK_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    dodaj({
      nazivJela: podaci.get("nazivJela"),
      kategorija: podaci.get("kategorija"),
      cijena: parseFloat(podaci.get("cijena")),
    });
  }

  return (
   <Row className="justify-content-center">
      <Col md={6}>
      <h1>Dodavanje jelovnika</h1>
        <Form onSubmit={obradiSubmit}>
          <Form.Group className="mb-3" controlId="nazivJela">
            <Form.Label>Naziv jela</Form.Label>
            <Form.Control type="text" name="nazivJela" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Control type="text" name="kategorija" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" name="cijena" step="0.01" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Dodaj
          </Button>
          <Link to={RouteNames.JELOVNIK_PREGLED} className="btn btn-secondary ms-2">
            Odustani
          </Link>
        </Form>
      </Col>
    </Row>
  );
}
