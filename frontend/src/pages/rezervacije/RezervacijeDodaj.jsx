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
    const { prikaziError } = useError();

    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState(0);
    const [stolovi, setStolovi] = useState([]);
    const [stolSifra, setStolSifra] = useState(0);
    const [datumVrijeme, setDatumVrijeme] = useState(new Date());

    async function dohvatiGoste() {
        showLoading();
        try {
            const odgovor = await GostService.get();
            if (!odgovor.greska && odgovor.poruka && odgovor.poruka.length > 0) {
                setGosti(odgovor.poruka);
                setGostSifra(odgovor.poruka[0].sifra);
            } else {
                console.error("Nema podataka o gostima ili je odgovor pogrešan:", odgovor);
                prikaziError(odgovor?.poruka || 'Nema dostupnih gostiju');
            }
        } catch (e) {
            console.error("Greška prilikom dohvaćanja gostiju:", e);
            prikaziError('Greška pri dohvatu gostiju');
        } finally {
            hideLoading();
        }
    }

    async function dohvatiStolove() {
        showLoading();
        try {
            const odgovor = await StolService.get();
            if (!odgovor.greska && odgovor.poruka && odgovor.poruka.length > 0) {
                setStolovi(odgovor.poruka);
                setStolSifra(odgovor.poruka[0].sifra);
            } else {
                console.error("Nema podataka o stolovima ili je odgovor pogrešan:", odgovor);
            }
        } catch (error) {
            console.error("Greška prilikom dohvaćanja stolova:", error);
        } finally {
            hideLoading();
        }
    }

    useEffect(() => {
        dohvatiGoste();
        dohvatiStolove();
    }, []);

    async function dodaj(rezervacija) {
        showLoading();
        try {
            const odgovor = await Service.dodaj({
                    rezervacija
            });
            
            if (odgovor.greska) {
                prikaziError(odgovor.poruka);
                return;
            }
            
            navigate(RouteNames.REZERVACIJA_PREGLED);
        } catch (error) {
            prikaziError(error.message || 'Došlo je do greške pri dodavanju rezervacije');
        } finally {
            hideLoading();
        }
    }

    function obradiSubmit(e) {
        e.preventDefault();
        
        const odabraniGost = gosti.find(gost => gost.sifra === parseInt(e.target.gostSifra.value));
        const odabraniStol = stolovi.find(stol => stol.sifra === parseInt(e.target.stolSifra.value));
        
        const brojOsoba = parseInt(e.target.brojOsoba.value);
        if (isNaN(brojOsoba) || brojOsoba <= 0) {
            prikaziError('Broj osoba mora biti veći od 0');
            return;
        }


        if (!odabraniGost || !odabraniStol) {
            prikaziError('Morate odabrati gosta i stol');
            return;
        }

        dodaj({
            gostImePrezime: `${odabraniGost.ime} ${odabraniGost.prezime}`,
            stolBroj: odabraniStol.brojStola,
            brojOsoba: parseInt(e.target.brojOsoba.value),
            napomena: e.target.napomena.value,
            gostSifra: odabraniGost.sifra,
            stolSifra: odabraniStol.sifra
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
                                disabled={gosti.length === 0}
                            >
                                {gosti.length > 0 ? (
                                    gosti.map((gost) => (
                                        <option key={gost.sifra} value={gost.sifra}>
                                            {gost.ime} {gost.prezime}
                                        </option>
                                    ))
                                ) : (
                                    <option>Učitavanje gostiju...</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="stolSifra">
                            <Form.Label>Stol</Form.Label>
                            <Form.Select
                                aria-label="Odaberi stol"
                                name="stolSifra"
                                defaultValue={stolSifra}
                                disabled={stolovi.length === 0}
                            >
                                {stolovi.length > 0 ? (
                                    stolovi.map((stol) => (
                                        <option key={stol.sifra} value={stol.sifra}>
                                            {stol.brojStola} (Kapacitet: {stol.kapacitet}, Lokacija: {stol.lokacija})
                                        </option>
                                    ))
                                ) : (
                                    <option>Učitavanje stolova...</option>
                                )}
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
                            <Form.Control 
                                type="number" 
                                name="brojOsoba" 
                                min="1" 
                                defaultValue="1"
                                required
                                />
                        <Form.Control.Feedback type="invalid">
                                Unesite broj veći od 0
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="napomena">
                            <Form.Label>Napomena</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="napomena" 
                                rows={3} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Dodaj
                        </Button>
                        <Link to={RouteNames.REZERVACIJA_PREGLED} className='btn btn-secondary ms-2'>
                            Odustani
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}