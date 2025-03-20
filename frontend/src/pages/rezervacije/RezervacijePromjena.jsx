import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import RezervacijaService from "../../services/RezervacijaService";
import GostService from "../../services/GostService";
import StolService from "../../services/StolService";
import { useEffect, useState } from "react";

export default function RezervacijePromjena() {
  const navigate = useNavigate();
  const [rezervacija, setRezervacija] = useState({});
  const [gosti, setGosti] = useState([]);
  const [stolovi, setStolovi] = useState([]);
  const routeParams = useParams();

  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        const rezervacijaOdgovor = await RezervacijaService.getBySifra(
          routeParams.sifra
        );
        setRezervacija(rezervacijaOdgovor);
        const gostiOdgovor = await GostService.get();
        setGosti(gostiOdgovor);
        const stoloviOdgovor = await StolService.get();
        setStolovi(stoloviOdgovor);
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
      }
    }

    dohvatiPodatke();
  }, [routeParams.sifra]);

  async function promjena(rezervacija) {
    try {
      const odgovor = await RezervacijaService.promjena(
        routeParams.sifra,
        rezervacija
      );
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.REZERVACIJA_PREGLED);
    } catch (error) {
      console.error("Greška pri ažuriranju rezervacije:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();

    let podaci = new FormData(e.target);

    promjena({
      gost: parseInt(podaci.get("gost")),
      stol: parseInt(podaci.get("stol")),
      datumVrijeme: podaci.get("datumVrijeme"),
      brojOsoba: parseInt(podaci.get("brojOsoba")),
      napomena: podaci.get("napomena"),
    });
  }

  return (
    <>
      <h2 className="naslov">Promjena rezervacije</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="gost">
          <Form.Label>Gost</Form.Label>
          <Form.Control
            as="select"
            name="gost"
            required
            defaultValue={rezervacija.gostImePrezime}
          >
            <option value="">Odaberite gosta</option>
            {gosti.map((gost) => (
              <option key={gost.sifra} value={gost.sifra}>
                {gost.ime} {gost.prezime}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="stol">
          <Form.Label>Stol</Form.Label>
          <Form.Control
            as="select"
            name="stol"
            required
            defaultValue={rezervacija.stolBroj}
          >
            <option value="">Odaberite stol</option>
            {stolovi.map((stol) => (
              <option key={stol.sifra} value={stol.sifra}>
                {stol.broj}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="datumVrijeme">
          <Form.Label>Datum i vrijeme</Form.Label>
          <Form.Control
            type="datetime-local"
            name="datumVrijeme"
            required
            defaultValue={rezervacija.datumVrijeme
              ? new Date(rezervacija.datumVrijeme).toISOString().slice(0, 16)
              : ""}
          />
        </Form.Group>

        <Form.Group controlId="brojOsoba">
          <Form.Label>Broj osoba</Form.Label>
          <Form.Control
            type="number"
            name="brojOsoba"
            required
            defaultValue={rezervacija.brojOsoba}
          />
        </Form.Group>

        <Form.Group controlId="napomena">
          <Form.Label>Napomena</Form.Label>
          <Form.Control
            type="text"
            name="napomena"
            defaultValue={rezervacija.napomena}
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
              Promjeni rezervaciju
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}