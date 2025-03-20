import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import RezervacijaService from "../../services/RezervacijaService";
import GostService from "../../services/GostService";
import StolService from "../../services/StolService";
import { useEffect, useState } from "react";

export default function RezervacijeDodaj() {
  const navigate = useNavigate();
  const [datumVrijeme, setDatumVrijeme] = useState("");
  const [brojOsoba, setBrojOsoba] = useState(1);
  const [napomena, setNapomena] = useState("");
  const [imeGosta, setImeGosta] = useState("");
  const [prezimeGosta, setPrezimeGosta] = useState("");
  const [brojStola, setBrojStola] = useState("");

  async function dodaj(rezervacija) {
    try {
      // Prvo dodajte gosta ako ne postoji
      const gostOdgovor = await GostService.dodaj({
        ime: imeGosta,
        prezime: prezimeGosta,
      });

      // Zatim dodajte stol ako ne postoji
      const stolOdgovor = await StolService.dodaj({
        broj: brojStola,
      });

      // Sada dodajte rezervaciju s novim ID-jevima gosta i stola
      const odgovor = await RezervacijaService.dodaj({
        gost: gostOdgovor.sifra, // Pretpostavljamo da API vraća sifra novog gosta
        stol: stolOdgovor.sifra, // Pretpostavljamo da API vraća sifra novog stola
        datumVrijeme: datumVrijeme,
        brojOsoba: parseInt(brojOsoba),
        napomena: napomena,
      });

      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.REZERVACIJA_PREGLED);
    } catch (error) {
      console.error("Greška pri dodavanju rezervacije:", error);
    }
  }

  function odradiSubmit(e) {
    e.preventDefault();

    dodaj({
      imeGosta: imeGosta,
      prezimeGosta: prezimeGosta,
      brojStola: brojStola,
      datumVrijeme: datumVrijeme,
      brojOsoba: parseInt(brojOsoba),
      napomena: napomena,
    });
  }

  return (
    <>
      <h2 className="naslov">Dodavanje rezervacije</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="imeGosta">
          <Form.Label>Ime gosta</Form.Label>
          <Form.Control
            type="text"
            name="imeGosta"
            value={imeGosta}
            onChange={(e) => setImeGosta(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="prezimeGosta">
          <Form.Label>Prezime gosta</Form.Label>
          <Form.Control
            type="text"
            name="prezimeGosta"
            value={prezimeGosta}
            onChange={(e) => setPrezimeGosta(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="brojStola">
          <Form.Label>Broj stola</Form.Label>
          <Form.Control
            type="text"
            name="brojStola"
            value={brojStola}
            onChange={(e) => setBrojStola(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="datumVrijeme">
          <Form.Label>Datum i vrijeme</Form.Label>
          <Form.Control
            type="datetime-local"
            name="datumVrijeme"
            value={datumVrijeme}
            onChange={(e) => setDatumVrijeme(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="brojOsoba">
          <Form.Label>Broj osoba</Form.Label>
          <Form.Control
            type="number"
            name="brojOsoba"
            value={brojOsoba}
            onChange={(e) => setBrojOsoba(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="napomena">
          <Form.Label>Napomena</Form.Label>
          <Form.Control
            type="text"
            name="napomena"
            value={napomena}
            onChange={(e) => setNapomena(e.target.value)}
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
              Dodaj rezervaciju
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}