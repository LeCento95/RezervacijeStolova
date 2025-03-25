import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/RezervacijaService';
import GostService from '../../services/GostService';
import StolService from '../../services/StolService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RouteNames } from '../../constants';
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

export default function RezervacijeDodaj() {
  const navigate = useNavigate();
  const {showLoading, hideLoading} = useLoading();

  const [gosti, setGosti] = useState([]);
  const {gostSifra, setGostSifra} = useState(0);

  const [stolovi, setStolovi] = useState([]);
  const {stolSifra, setStolSifra} = useState(0);

  const [datumVrijeme, setDatumVrijeme] = useState(new Date());

  const {prikaziError} = useError();

  async function dohvatiGoste() {
    showLoading();
    const odgovor = await GostService.get();
    hideLoading();
    setGosti(odgovor.poruka);
    setGostSifra(odgovor.poruka[0].sifra);
  }

  async function dohvatiStolove() {
    showLoading();
    const odgovor = await StolService.get();
    hideLoading();
    setStolovi(odgovor.poruka);
    setStolSifra(odgovor.poruka[0].sifra);
  }

  useEffect(() => {
    dohvatiGoste();
    dohvatiStolove();
  }, []);

  async function dodaj(e) {
    showLoading();
    const odgovor = await Service.dodaj(e);
    hideLoading();
    if(odgovor.greska){
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.REZERVACIJA_PREGLED);
  }

  function obradiSubmit(e){
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      gostSifra: parseInt(podaci.get('gostSifra')),
      stolSifra: parseInt(podaci.get('stolSifra')),
      datumVrijeme: podaci.get('datumVrijeme') ? new Date(podaci.get('datumVrijeme')).toISOString() : null,
      brojOsoba: parseInt('brojOsoba'),
      napomena: podaci.get('napomena'),
      ime: podaci.get('Ime gosta'),
      prezime: podaci.get('Prezime gosta'),
      brojtelefona: podaci.get('Broj telefona gosta'),
      email: podaci.get('Email gosta'),
      brojStola: parseInt('brojStola'),
      kapacitet: parseInt('kapacitet'),
      lokacija: podaci.get('lokacija'),

    })
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="mb-5">Dodaj novu rezervaciju</h1>
          <Form onSubmit={obradiSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Gost</Form.Label>
              <Form.Select name="gostSifra">
                {gosti.map(gost => (
                  <option key={gost.sifra} value={gost.sifra}>{gost.ime} {gost.prezime}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stol</Form.Label>
              <Form.Select name="stolSifra">
                {stolovi.map(stol => (
                  <option key={stol.sifra} value={stol.sifra}>{stol.brojStola}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Datum i vrijeme</Form.Label>
              <DatePicker
                selected={datumVrijeme}
                onChange={(date) => setDatumVrijeme(date)}
                showTimeSelect
                dateFormat="Pp"
                name="datumVrijeme"
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Broj osoba</Form.Label>
              <Form.Control type="number" name="brojOsoba" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Napomena</Form.Label>
              <Form.Control type="text" name="napomena" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Dodaj
            </Button>
            <Link to={RouteNames.REZERVACIJA_PREGLED} className="btn btn-secondary ms-2">
              Odustani
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}