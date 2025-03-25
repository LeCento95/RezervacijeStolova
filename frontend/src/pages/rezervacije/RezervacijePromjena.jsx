import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/RezervacijaService';
import GostService from '../../services/GostService';
import StolService from '../../services/StolService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RouteNames } from '../../constants';
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';


export default function RezervacijePromjena() {
  const navigate = useNavigate();
  const { sifra } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  const [gosti, setGosti] = useState([]);
  const [stolovi, setStolovi] = useState([]);
  const [rezervacija, setRezervacija] = useState(null);
  const [datumVrijeme, setDatumVrijeme] = useState(null);

  async function dohvatiGoste() {
    showLoading();
    const odgovor = await GostService.get();
    hideLoading();
    setGosti(odgovor.poruka);
  }

  async function dohvatiStolove() {
    showLoading();
    const odgovor = await StolService.get();
    hideLoading();
    setStolovi(odgovor.poruka);
  }

  async function dohvatiRezervaciju() {
    showLoading();
    const odgovor = await Service.getById(sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    setRezervacija(odgovor.poruka);
    setDatumVrijeme(new Date(odgovor.poruka.datumVrijeme));
  }

  useEffect(() => {
    dohvatiGoste();
    dohvatiStolove();
    dohvatiRezervaciju();
  }, [sifra]);

  async function promjeni(e) {
    showLoading();
    const odgovor = await Service.promjeni(e);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.REZERVACIJA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    promjeni({
      sifra: parseInt(sifra),
      gostSifra: parseInt(podaci.get('gostSifra')),
      stolSifra: parseInt(podaci.get('stolSifra')),
      datumVrijeme: podaci.get('datumVrijeme') ? new Date(podaci.get('datumVrijeme')).toISOString() : null,
      brojOsoba: parseInt(podaci.get('brojOsoba')),
      napomena: podaci.get('napomena'),
    });
  }

  if (!rezervacija) {
    return <div>Učitavanje...</div>;
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="mb-5">Promijeni rezervaciju</h1>
          <Form onSubmit={obradiSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Gost</Form.Label>
              <Form.Select name="gostSifra" defaultValue={rezervacija.gost.sifra}>
                {gosti.map((gost) => (
                  <option key={gost.sifra} value={gost.sifra}>
                    {gost.ime} {gost.prezime}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stol</Form.Label>
              <Form.Select name="stolSifra" defaultValue={rezervacija.stol.sifra}>
                {stolovi.map((stol) => (
                  <option key={stol.sifra} value={stol.sifra}>
                    {stol.brojStola}
                  </option>
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
              <Form.Control type="number" name="brojOsoba" defaultValue={rezervacija.brojOsoba} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Napomena</Form.Label>
              <Form.Control type="text" name="napomena" defaultValue={rezervacija.napomena} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Promijeni
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