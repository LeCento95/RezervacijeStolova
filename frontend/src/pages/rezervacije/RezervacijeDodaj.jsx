import { Button, Col, Container, Form, Row } from 'react-bootstrap';
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
    const { showLoading, hideLoading } = useLoading();

    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState(0);

    const [stolovi, setStolovi] = useState([]);
    const [stolSifra, setStolSifra] = useState(0);

    const [datumVrijeme, setDatumVrijeme] = useState(new Date());

    const { prikaziError } = useError();

    async function dohvatiGoste() {
        showLoading();
        const odgovor = await GostService.get();
        hideLoading();
        setGosti(odgovor.poruka);
        setGostSifra(odgovor.poruka[0].sifra);
    }

    async function dohvatiStolove() {
      showLoading();
      try {
        const odgovor = await StolService.get();
        hideLoading();
        console.log("Odgovor iz StolService.get():", odgovor);
    
        if (odgovor && odgovor.poruka && Array.isArray(odgovor.poruka) && odgovor.poruka.length > 0 && odgovor.poruka[0] && odgovor.poruka[0].sifra) {
          setStolovi(odgovor.poruka);
          setStolSifra(odgovor.poruka[0].sifra);
        } else {
          console.error("Nema podataka o stolovima ili je odgovor pogrešan:", odgovor);
          setStolSifra(0);
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja stolova:", error);
        hideLoading();
      }
    }

    useEffect(() => {
        dohvatiGoste();
        dohvatiStolove();
    }, []);

    async function dodaj(e) {
        showLoading();
        const odgovor = await Service.dodaj(e);
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

        dodaj({
            gostImePrezime: gosti.find(gost => gost.sifra === parseInt(podaci.get('gostSifra'))).ime + ' ' + gosti.find(gost => gost.sifra === parseInt(podaci.get('gostSifra'))).prezime,
            stolBroj: stolovi.find(stol => stol.sifra === parseInt(podaci.get('stolSifra'))).stolBroj,
            datumVrijeme: podaci.get('datumVrijeme'),
            brojOsoba: podaci.get('brojOsoba'),
            napomena: podaci.get('napomena')
          }); 
    }

    return (
      <Container>
          <Row className='mt-2'>
              <Col sm={12}>
                  <Form onSubmit={obradiSubmit}>
                      <Form.Group className="mb-3" controlId="gostSifra">
                          <Form.Label>Gost</Form.Label>
                          <Form.Select
                              aria-label="Odaberi gosta"
                              name="gostSifra"
                              defaultValue={gostSifra}
                          >
                              {gosti && gosti.length > 0 ? gosti.map((gost) => (
                                  <option key={gost.sifra} value={gost.sifra}>
                                      {gost.ime} {gost.prezime}
                                  </option>
                              )) : <option>Nema gostiju</option>}
                          </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="stolSifra">
                          <Form.Label>Stol</Form.Label>
                          <Form.Select
                              aria-label="Odaberi stol"
                              name="stolSifra"
                              defaultValue={stolSifra}
                          >
                              {stolovi && stolovi.length > 0 ? stolovi.map((stol) => (
                                  <option key={stol.sifra} value={stol.sifra}>
                                      {stol.brojStola} {stol.kapacitet} {stol.lokacija}
                                  </option>
                              )) : <option>Nema stolova</option>}
                          </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="datumVrijeme">
                          <Form.Label>Datum i vrijeme</Form.Label>
                          <DatePicker
                              selected={datumVrijeme}
                              onChange={(date) => setDatumVrijeme(date)}
                              showTimeSelect
                              dateFormat="Pp"
                              name="datumVrijeme"
                              className='form-control'
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="brojOsoba">
                          <Form.Label>Broj osoba</Form.Label>
                          <Form.Control type="number" name="brojOsoba" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="napomena">
                          <Form.Label>Napomena</Form.Label>
                          <Form.Control type="text" name="napomena" />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                          Dodaj
                      </Button>
                      <Link to={RouteNames.REZERVACIJA_PREGLED} className='btn btn-secondary ms-2'>Odustani</Link>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
}
