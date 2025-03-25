import { useEffect, useState } from "react";
import StolService from "../../services/StolService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function StoloviPregled() {
  const [stolovi, setStolovi] = useState([]);
  const navigate = useNavigate();

  async function dohvatiStolove() {
    try {
      const odgovor = await StolService.get();
      setStolovi(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju stolova:", error);
    }
  }

  async function obrisi(sifra) {
    try {
      const odgovor = await StolService.obrisi(sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      dohvatiStolove();
    } catch (error) {
      console.error("Greška pri brisanju stola:", error);
    }
  }

  useEffect(() => {
    dohvatiStolove();
  }, []);

  return (
    <>
      <Link to={RouteNames.STOL_NOVI} className="btn btn-success siroko">
        Dodaj novi stol
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Broj stola</th>
            <th>Kapacitet</th>
            <th>Lokacija</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {stolovi && Array.isArray(stolovi) && stolovi.length > 0 ? (
            stolovi.map((stol, index) => (
              <tr key={index}>
                <td>{stol.brojStola}</td>
                <td>{stol.kapacitet}</td>
                <td>{stol.lokacija}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => navigate(`/stolovi/${stol.sifra}`)}>
                    Promjena
                  </Button>
                  <Button variant="danger" onClick={() => obrisi(stol.sifra)}>
                    Obriši
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nema podataka o stolovima.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}