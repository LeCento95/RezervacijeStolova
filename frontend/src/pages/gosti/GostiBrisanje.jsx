import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import GostService from "../../services/GostService";
import { useEffect, useState } from "react";

export default function GostiBrisanje() {
  const navigate = useNavigate();
  const [gost, setGost] = useState({});
  const routeParams = useParams();

  async function dohvatiGosta() {
    try {
      const odgovor = await GostService.getBySifra(routeParams.sifra);
      setGost(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka o gostu:", error);
    }
  }

  useEffect(() => {
    dohvatiGosta();
  }, [routeParams.sifra]);

  async function obrisi() {
    try {
      const odgovor = await GostService.obrisi(routeParams.sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.GOST_PREGLED);
    } catch (error) {
      console.error("Greška pri brisanju podataka o gostu:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();
    obrisi();
  }

  return (
    <>
      <h2 className="naslov">Brisanje gosta</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            name="ime"
            required
            defaultValue={gost.ime || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="text"
            name="prezime"
            required
            defaultValue={gost.prezime || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="brojTelefona">
          <Form.Label>Broj Telefona</Form.Label>
          <Form.Control
            type="number"
            name="brojTelefona"
            defaultValue={gost.brojTelefona || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            defaultValue={gost.email || ""}
            readOnly
          />
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
              Obriši gosta
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}