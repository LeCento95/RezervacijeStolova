import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import Service from "../../services/GostService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';


export default function GostiPromjena() {

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    const [gosti, setGosti] = useState({});
    const { prikaziError } = useError();


    async function dohvatiGosti() {
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
        dohvatiGosti();
    }, []);

    async function promjena(e) {
        showLoading();
        const odgovor = await Service.promjena(routeParams.sifra, e);
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        navigate(RouteNames.GOST_PREGLED);
    }

    function obradiSubmit(e) { 
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
          ime: podaci.get("ime"),
          prezime: podaci.get("prezime"),
          brojTelefona: podaci.get("brojTelefona"),
          email: podaci.get("email"),
        });

    }

    return (
      <Row className="justify-content-center">
          <Col md={6}>
              <h1>Promjena gosta</h1>
              <Form onSubmit={obradiSubmit}>
                  <Form.Group className="mb-3" controlId="ime">
                      <Form.Label>Ime</Form.Label>
                      <Form.Control
                          type="text"
                          name="ime"
                          defaultValue={gosti.ime}
                          required
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="prezime">
                      <Form.Label>Prezime</Form.Label>
                      <Form.Control
                          type="text"
                          name="prezime"
                          defaultValue={gosti.prezime}
                          required
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="brojTelefona">
                      <Form.Label>Broj telefona</Form.Label>
                      <Form.Control
                          type="text"
                          name="brojTelefona"
                          defaultValue={gosti.brojTelefona}
                          required
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                          type="email"
                          name="email"
                          defaultValue={gosti.email}
                          required
                      />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                      Promjeni
                  </Button>
                  <Link to={RouteNames.GOST_PREGLED} className="btn btn-secondary ms-2">
                      Odustani
                  </Link>
              </Form>
          </Col>
      </Row>
  );
}