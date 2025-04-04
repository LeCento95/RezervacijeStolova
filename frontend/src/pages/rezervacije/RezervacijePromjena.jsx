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
import { hr } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';

registerLocale('hr', hr);

export default function RezervacijePromjena() {
    const navigate = useNavigate();
    const { sifra } = useParams();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();
    const [errors, setErrors] = useState({});
    const [kapaciteti, setKapaciteti] = useState({});

    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState(0);
    const [stolovi, setStolovi] = useState([]);
    const [stolSifra, setStolSifra] = useState(0);
    const [datumVrijeme, setDatumVrijeme] = useState(() => {
        const now = new Date();
        now.setHours(12, 0, 0, 0);
        return now;
    });
    const [brojOsoba, setBrojOsoba] = useState(1);
    const [napomena, setNapomena] = useState('');

    const [minTime, setMinTime] = useState(() => {
        const time = new Date();
        time.setHours(8, 0, 0, 0);
        return time;
    });

    const [maxTime, setMaxTime] = useState(() => {
        const time = new Date();
        time.setHours(22, 45, 0, 0);
        return time;
    });

    useEffect(() => {
        const updateTimeConstraints = () => {
            const newMinTime = new Date();
            newMinTime.setHours(8, 0, 0, 0);
            setMinTime(newMinTime);

            const newMaxTime = new Date();
            newMaxTime.setHours(22, 45, 0, 0);
            setMaxTime(newMaxTime);
        };

        updateTimeConstraints();
    }, [datumVrijeme]);

    async function dohvatiGoste() {
        showLoading();
        try {
            const odgovor = await GostService.get();
            if (!odgovor.greska && odgovor.poruka && odgovor.poruka.length > 0) {
                setGosti(odgovor.poruka);
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
                
                const kapacitetMap = {};
                odgovor.poruka.forEach(stol => {
                    kapacitetMap[stol.sifra] = stol.kapacitet;
                });
                setKapaciteti(kapacitetMap);
            } else {
                console.error("Nema podataka o stolovima ili je odgovor pogrešan:", odgovor);
            }
        } catch (error) {
            console.error("Greška prilikom dohvaćanja stolova:", error);
        } finally {
            hideLoading();
        }
    }

    async function dohvatiRezervaciju() {
        showLoading();
        try {
            const odgovor = await Service.getBySifra(sifra);
            if (odgovor.greska) {
                prikaziError(odgovor.poruka);
                return;
            }
            
            const rez = odgovor.poruka;
            setRezervacija(rez);
            setGostSifra(rez.gost.sifra);
            setStolSifra(rez.stol.sifra);
            setBrojOsoba(rez.brojOsoba);
            setNapomena(rez.napomena || '');
            
            // Parse and set the date
            const date = new Date(rez.datumVrijeme);
            if (!isNaN(date.getTime())) {
                setDatumVrijeme(date);
            }
        } catch (error) {
            console.error("Greška prilikom dohvaćanja rezervacije:", error);
            prikaziError('Greška pri dohvatu rezervacije');
        } finally {
            hideLoading();
        }
    }

    useEffect(() => {
        dohvatiGoste();
        dohvatiStolove();
        dohvatiRezervaciju();
    }, [sifra]);

    async function promjeni(rezervacija) {
        showLoading();
        try {
            const reservationDate = new Date(rezervacija.datumVrijeme);
            const timezoneOffset = reservationDate.getTimezoneOffset() * 60000;
            const localISOTime = new Date(reservationDate.getTime() - timezoneOffset).toISOString();
            
            const payload = {
                gost: Number(rezervacija.gostSifra),
                stol: Number(rezervacija.stolSifra),
                brojOsoba: Number(rezervacija.brojOsoba),
                datumVrijeme: localISOTime,
                napomena: rezervacija.napomena || ''
            };

            console.log('Updating reservation:', payload);
            
            const odgovor = await Service.promjeni(sifra, payload);
            
            if (odgovor.greska) {
                if (odgovor.validationErrors) {
                    setErrors(odgovor.validationErrors);
                }
                prikaziError(odgovor.poruka);
                return;
            }
            
            navigate(RouteNames.REZERVACIJA_PREGLED);
        } catch (error) {
            console.error('Error:', error);
            prikaziError(error.message || 'Došlo je do greške pri ažuriranju rezervacije');
        } finally {
            hideLoading();
        }
    }

    function obradiSubmit(e) {
        e.preventDefault();
        setErrors({});
        
        const formData = new FormData(e.target);
        const brojOsoba = parseInt(formData.get('brojOsoba'));
        const gostSifra = parseInt(formData.get('gostSifra'));
        const stolSifra = parseInt(formData.get('stolSifra'));
        const napomena = formData.get('napomena');
        
        const newErrors = {};
        
        if (isNaN(gostSifra)) newErrors.Gost = 'Morate odabrati gosta';
        if (isNaN(stolSifra)) newErrors.Stol = 'Morate odabrati stol';
        
        if (isNaN(brojOsoba)) {
            newErrors.BrojOsoba = 'Broj osoba mora biti broj';
        } else if (brojOsoba <= 0) {
            newErrors.BrojOsoba = 'Broj osoba mora biti veći od 0';
        } else if (kapaciteti[stolSifra] && brojOsoba > kapaciteti[stolSifra]) {
            newErrors.BrojOsoba = `Broj osoba premašuje kapacitet stola (max: ${kapaciteti[stolSifra]})`;
        }
        
        if (!datumVrijeme) {
            newErrors.Datum = 'Datum i vrijeme su obavezni';
        } else {
            const now = new Date();
            const hours = datumVrijeme.getHours();
            const minutes = datumVrijeme.getMinutes();
            
            if (datumVrijeme < now) {
                newErrors.Datum = 'Datum i vrijeme moraju biti u budućnosti';
            } else if (hours < 8 || (hours >= 23 && minutes > 0)) {
                newErrors.Datum = 'Radno vrijeme je od 08:00 do 23:00';
            }
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        promjeni({
            gostSifra,
            stolSifra,
            brojOsoba,
            napomena,
            datumVrijeme
        });
    }

    if (!rezervacija) {
        return <div>Učitavanje rezervacije...</div>;
    }

    return (
        <Container>
            <Row className='mt-2'>
                <Col sm={12}>
                    <Form onSubmit={obradiSubmit} noValidate>
                        <Form.Group className="mb-3" controlId="gostSifra">
                            <Form.Label>Gost</Form.Label>
                            <Form.Select
                                aria-label="Odaberi gosta"
                                name="gostSifra"
                                value={gostSifra}
                                onChange={(e) => setGostSifra(parseInt(e.target.value))}
                                isInvalid={!!errors.Gost}
                            >
                                {gosti.length > 0 ? (
                                    gosti.map((gost) => (
                                        <option key={gost.sifra} value={gost.sifra}>
                                            {gost.ime} {gost.prezime}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Učitavanje gostiju...</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.Gost}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="stolSifra">
                            <Form.Label>Stol</Form.Label>
                            <Form.Select
                                aria-label="Odaberi stol"
                                name="stolSifra"
                                value={stolSifra}
                                onChange={(e) => setStolSifra(parseInt(e.target.value))}
                                isInvalid={!!errors.Stol}
                            >
                                {stolovi.length > 0 ? (
                                    stolovi.map((stol) => (
                                        <option key={stol.sifra} value={stol.sifra}>
                                            {stol.brojStola} (Kapacitet: {stol.kapacitet}, Lokacija: {stol.lokacija})
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Učitavanje stolova...</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.Stol}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="datumVrijeme">
                            <Form.Label>Datum i vrijeme</Form.Label>
                            <DatePicker
                                selected={datumVrijeme}
                                onChange={(date) => {
                                    if (date) {
                                        setDatumVrijeme(date);
                                        if (errors.Datum) {
                                            setErrors(prev => ({ ...prev, Datum: undefined }));
                                        }
                                    }
                                }}
                                showTimeSelect
                                dateFormat="dd.MM.yyyy HH:mm"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                minDate={new Date()}
                                minTime={minTime}
                                maxTime={maxTime}
                                className={`form-control ${errors.Datum ? 'is-invalid' : ''}`}
                                locale="hr"
                                placeholderText="Odaberite datum i vrijeme"
                                autoComplete="off"
                                isClearable
                                filterTime={(time) => {
                                    const hours = time.getHours();
                                    return hours >= 8 && hours < 23;
                                }}
                                todayButton="Danas"
                                popperPlacement="auto"
                            />
                            {errors.Datum && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.Datum}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="brojOsoba">
                            <Form.Label>Broj osoba</Form.Label>
                            <Form.Control
                                type="number"
                                name="brojOsoba"
                                min="1"
                                step="1"
                                value={brojOsoba}
                                onChange={(e) => {
                                    setBrojOsoba(parseInt(e.target.value));
                                    if (errors.BrojOsoba) {
                                        setErrors(prev => ({ ...prev, BrojOsoba: undefined }));
                                    }
                                }}
                                required
                                isInvalid={!!errors.BrojOsoba}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.BrojOsoba}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="napomena">
                            <Form.Label>Napomena</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="napomena"
                                rows={3}
                                value={napomena}
                                onChange={(e) => setNapomena(e.target.value)}
                                isInvalid={!!errors.Napomena}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.Napomena}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {errors.general && (
                            <div className="alert alert-danger">
                                {errors.general}
                            </div>
                        )}

                        <Button variant="primary" type="submit">
                            Spremi promjene
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