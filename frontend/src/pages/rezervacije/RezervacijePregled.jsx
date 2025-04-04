import React, { useState, useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Service from '../../services/RezervacijaService';
import { RouteNames } from '../../constants';
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';
import moment from 'moment';

export default function RezervacijePregled() {
  const [rezervacije, setRezervacije] = useState([]);
  let navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  async function dohvatiRezervacije() {
    showLoading();
    await Service.get().then((odgovor) => {
      setRezervacije(odgovor.poruka);
    })
    .catch((e) => {
      console.log(e);
      hideLoading();
    });
    hideLoading();
  }

  async function obrisiRezervacije(sifra) {
    showLoading();
    const odgovor = await Service.obrisi(sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    dohvatiRezervacije();
  }

  useEffect(() => {
    dohvatiRezervacije();
    
  }, []);

  return (
    <Container>
      <h1 className="mt-4 mb-4">Pregled rezervacija</h1>
      <Link to={RouteNames.REZERVACIJA_NOVA} className="btn btn-primary mb-3">
        Dodaj novu rezervaciju
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Gost</th>
            <th>Stol</th>
            <th>Datum i vrijeme</th>
            <th>Broj osoba</th>
            <th>Napomena</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {rezervacije.map((rezervacija) => (
            <tr key={rezervacija.sifra}>
              <td>{rezervacija.gostImePrezime}</td>
              <td>{rezervacija.stolBroj}</td>
              <td>{moment(rezervacija.datumVrijeme).format('DD.MM.YYYY HH:mm')}</td>
              <td>{rezervacija.brojOsoba}</td>
              <td>{rezervacija.napomena}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => navigate(`/rezervacije/${rezervacija.sifra}`)}>
                    Promjena
                  </Button>
                  <Button variant="danger" onClick={() => obrisi(rezervacija.sifra)}>
                    Obriši
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}