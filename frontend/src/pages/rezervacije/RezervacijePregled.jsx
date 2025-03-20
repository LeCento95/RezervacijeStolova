import { useEffect, useState } from "react";
import RezervacijaService from "../../services/RezervacijaService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function RezervacijePregled() {
  const [rezervacije, setRezervacije] = useState([]);
  const navigate = useNavigate();

  async function dohvatiRezervacije() {
    try {
      const odgovor = await RezervacijaService.get();
      setRezervacije(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju rezervacija:", error);
    }
  }

  async function obrisi(sifra) {
    try {
      const odgovor = await RezervacijaService.obrisi(sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      dohvatiRezervacije();
    } catch (error) {
      console.error("Greška pri brisanju rezervacije:", error);
    }
  }

  useEffect(() => {
    dohvatiRezervacije();
  }, []);

  return (
    <>
      <Link to={RouteNames.REZERVACIJA_NOVA} className="btn btn-success siroko">
        Dodaj novu rezervaciju
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Gost</th>
            <th>Stol</th>
            <th>Datum i vrijeme</th>
            <th>Broj osoba</th>
            <th>Napomena</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {rezervacije.map((rezervacija, index) => (
            <tr key={index}>
              <td>{rezervacija.gostImePrezime}</td>
              <td>{rezervacija.stolBroj}</td>
              <td>{new Date(rezervacija.datumVrijeme).toLocaleString()}</td>
              <td>{rezervacija.brojOsoba}</td>
              <td>{rezervacija.napomena}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={() => navigate(`/rezervacije/${rezervacija.sifra}`)}
                >
                  Promjena
                </Button>
                <Button
                  variant="danger"
                  onClick={() => obrisi(rezervacija.sifra)}
                >
                  Obriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}