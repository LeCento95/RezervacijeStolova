import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import RezervacijaService from "../../services/RezervacijaService";
import { useEffect, useState } from "react";

export default function RezervacijeBrisanje() {
  const navigate = useNavigate();
  const [rezervacija, setRezervacija] = useState({});
  const routeParams = useParams();

  async function dohvatiRezervaciju() {
    try {
      const odgovor = await RezervacijaService.getBySifra(routeParams.sifra);
      setRezervacija(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka o rezervaciji:", error);
    }
  }

  useEffect(() => {
    dohvatiRezervaciju();
  }, [routeParams.sifra]);

  async function obrisi() {
    try {
      const odgovor = await RezervacijaService.obrisi(routeParams.sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.REZERVACIJA_PREGLED);
    } catch (error) {
      console.error("Greška pri brisanju podataka o rezervaciji:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();
    obrisi();
  }

  return (
    <>
      <h2 className="naslov">Brisanje rezervacije</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="gostImePrezime">
          <Form.Label>Gost</Form.Label>
          <Form.Control
            type="text"
            name="gostImePrezime"
            required
            defaultValue={rezervacija.gostImePrezime || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="stolBroj">
          <Form.Label>Stol</Form.Label>
          <Form.Control
            type="text"
            name="stolBroj"
            required
            defaultValue={rezervacija.stolBroj || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="datumVrijeme">
          <Form.Label>Datum i vrijeme</Form.Label>
          <Form.Control
            type="datetime-local"
            name="datumVrijeme"
            defaultValue={rezervacija.datumVrijeme
              ? new Date(rezervacija.datumVrijeme).toISOString().slice(0, 16)
              : ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="brojOsoba">
          <Form.Label>Broj osoba</Form.Label>
          <Form.Control
            type="number"
            name="brojOsoba"
            defaultValue={rezervacija.brojOsoba || ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="napomena">
          <Form.Label>Napomena</Form.Label>
          <Form.Control
            type="text"
            name="napomena"
            defaultValue={rezervacija.napomena || ""}
            readOnly
          />
        </Form.Group>

        <hr />

        <Row>
          <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
            <Link to={RouteNames.REZERVACIJA_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
            <Button variant="success" type="submit" className="siroko">
              Obriši rezervaciju
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}