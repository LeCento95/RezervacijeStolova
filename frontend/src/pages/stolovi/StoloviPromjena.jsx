import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import StolService from "../../services/StolService";
import { useEffect, useState } from "react";

export default function StoloviPromjena() {
  const navigate = useNavigate();
  const [stol, setStol] = useState({});
  const routeParams = useParams();

  async function dohvatiStol() {
    try {
      const odgovor = await StolService.getBySifra(routeParams.sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      setStol(odgovor.poruka);
    } catch (error) {
      console.error("Greška pri dohvaćanju stola:", error);
    }
  }

  async function promjena(stol) {
    try {
      const odgovor = await StolService.promjena(routeParams.sifra, stol);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.STOL_PREGLED);
    } catch (error) {
      console.error("Greška pri promjeni stola:", error);
    }
  }

  useEffect(() => {
    dohvatiStol();
  }, [routeParams.sifra]);

  function odradiSubmit(e) {
    e.preventDefault();

    let podaci = new FormData(e.target);

    promjena({
      brojStola: parseInt(podaci.get("brojStola")),
      kapacitet: parseInt(podaci.get("kapacitet")),
      lokacija: podaci.get("lokacija"),
    });
  }

  return (
    <>
      <h2 className="naslov">Promjena stola</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="brojStola">
          <Form.Label>Broj stola</Form.Label>
          <Form.Control
            type="number"
            name="brojStola"
            required
            defaultValue={stol.brojStola || ""}
          />
        </Form.Group>

        <Form.Group controlId="kapacitet">
          <Form.Label>Kapacitet</Form.Label>
          <Form.Control
            type="number"
            name="kapacitet"
            required
            defaultValue={stol.kapacitet || ""}
          />
        </Form.Group>

        <Form.Group controlId="lokacija">
          <Form.Label>Lokacija</Form.Label>
          <Form.Control
            type="text"
            name="lokacija"
            defaultValue={stol.lokacija || ""}
          />
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
              Promjeni stol
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}