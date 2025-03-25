import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import Service from "../../services/GostService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function GostiBrisanje() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const routeParams = useParams();
  const [gost, setGosti] = useState({});
  const { prikaziError } = useError();

  async function dohvatiGoste() {
    showLoading();
    const odgovor = await Service.getBySifra(routeParams.sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    setGosti(odgovor.poruka);
  }

  useEffect(() => {
    dohvatiGoste();
  }, []);

  async function obrisi() {
    showLoading();
    const odgovor = await Service.obrisi(routeParams.sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.GOST_PREGLED);
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h1>Brisanje gosta</h1>
        <p>Jeste li sigurni da želite obrisati gosta:</p>
        <p>
          <strong>Ime:</strong> {gost.ime}
        </p>
        <p>
          <strong>Prezime:</strong> {gost.prezime}
        </p>
        <p>
          <strong>Email:</strong> {gost.email}
        </p>
        <p>
          <strong>Broj telefona:</strong> {gost.brojTelefona}
        </p>

        <Button variant="danger" onClick={obrisi}>
          Obriši
        </Button>
        <Link to={RouteNames.GOST_PREGLED} className="btn btn-secondary ms-2">
          Odustani
        </Link>
      </Col>
    </Row>
  );
}