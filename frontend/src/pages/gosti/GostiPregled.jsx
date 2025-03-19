import { useEffect, useState } from "react";
import GostService from "../../services/GostService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function GostiPregled() {
  const [gosti, setGosti] = useState([]);
  const navigate = useNavigate();

  async function dohvatiGoste() {
    try {
      const odgovor = await GostService.get();
      setGosti(odgovor);
    } catch (error) {
      console.error("Greška pri dohvaćanju gostiju:", error);
    }
  }

  async function obrisi(sifra) {
    try {
      const odgovor = await GostService.obrisi(sifra);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      dohvatiGoste(); 
    } catch (error) {
      console.error("Greška pri brisanju gosta:", error);
    }
  }

  useEffect(() => {
    dohvatiGoste();
  }, []);

  return (
    <>
      <Link to={RouteNames.GOST_NOVI} className="btn btn-success siroko">
        Dodaj novog gosta
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Broj Telefona</th>
            <th>Email</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {gosti.map((gost, index) => (
            <tr key={index}>
              <td>{gost.ime}</td>
              <td>{gost.prezime}</td>
              <td>{gost.brojTelefona}</td>
              <td>{gost.email}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <Button onClick={() => navigate(`/gosti/${gost.sifra}`)}>
                  Promjena
                </Button>
                <Button variant="danger" onClick={() => obrisi(gost.sifra)}>
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