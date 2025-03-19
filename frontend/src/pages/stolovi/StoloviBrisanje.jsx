import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants"; 
import StolService from '../../services/StolService';
import { useEffect, useState } from "react";

export default function StoloviBrisanje() {
  const navigate = useNavigate();
  const [stol, setStol] = useState({});
  const routeParams = useParams();

  async function dohvatiStol() {
    try {
      const odgovor = await StolService.getBySifra(routeParams.sifra);
      setStol(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka o stolu:", error);
    }
  }

  useEffect(() => {
    dohvatiStol();
  }, [routeParams.sifra]);

  async function obrisi() {
    try {
      const odgovor = await StolService.obrisi(routeParams.sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.STOL_PREGLED); 
    } catch (error) {
      console.error("Greška pri brisanju podataka o stolu:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();
    obrisi();
  }

  return (
    <>
      <h2 className="naslov">Brisanje stola</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="brojStola">
          <Form.Label>Broj stola</Form.Label>
          <Form.Control
            type="number"
            name="brojStola"
            required
            defaultValue={stol.brojStola || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="kapacitet">
          <Form.Label>Kapacitet</Form.Label>
          <Form.Control
            type="number"
            name="kapacitet"
            required
            defaultValue={stol.kapacitet || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="lokacija">
          <Form.Label>Lokacija</Form.Label>
          <Form.Control
            type="text"
            name="lokacija"
            defaultValue={stol.lokacija || ""}
            readOnly
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
              Obriši stol
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}