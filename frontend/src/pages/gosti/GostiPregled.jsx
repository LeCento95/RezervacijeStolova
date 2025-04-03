import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import GostService from "../../services/GostService";
import { useEffect, useState } from "react";
import { RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function GostiPregled() {
  const [gosti, setGosti] = useState([]);
  const [stranica, setStranica] = useState(1);
  const [uvjet, setUvjet] = useState("");
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  async function dohvatiGoste() {
    showLoading();
    const odgovor = await GostService.traziStranicenje(stranica, uvjet);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    if (odgovor.poruka.length === 0 && stranica > 1) {
      setStranica(stranica - 1);
      return;
    }
    setGosti(odgovor.poruka);
  }

  useEffect(() => {
    dohvatiGoste();
  }, [stranica, uvjet]); 

  async function obrisiAsync(sifra) {
    showLoading();
    const odgovor = await GostService.obrisi(sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    dohvatiGoste();
  }

  function obrisi(sifra) {
    obrisiAsync(sifra);
  }

  function promjeniUvjet(e) {
    if (e.key === "Enter") {
        const noviUvjet = e.target.value;
        if (noviUvjet.length >= 3) {
            setStranica(1);
            setUvjet(noviUvjet);
            setGosti([]);
        } else {
            if (noviUvjet.length > 0) {
                prikaziError("Uvjet pretrage mora imati barem 3 znaka");
            }
        }
    }
}

  function povecajStranicu() {
    setStranica(stranica + 1);
  }

  function smanjiStranicu() {
    if (stranica === 1) {
      return;
    }
    setStranica(stranica - 1);
  }

  return (
    <>
      <Row>
        <Col key={1} sm={12} lg={4} md={4}>
          <Form.Control
            type="text"
            name="trazilica"
            placeholder="Dio imena i prezimena"
            maxLength={255}
            defaultValue=""
            onKeyUp={promjeniUvjet}
          />
        </Col>
        <Col key={2} sm={12} lg={4} md={4}>
          {gosti && gosti.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination size="lg">
                <Pagination.Prev onClick={smanjiStranicu} disabled={stranica === 1} />
                <Pagination.Item disabled>{stranica}</Pagination.Item>
                <Pagination.Next onClick={povecajStranicu} disabled={gosti.length < 7} />
              </Pagination>
            </div>
          )}
        </Col>
        <Col key={3} sm={12} lg={4} md={4}>
          <Link to={RouteNames.GOST_NOVI} className="btn btn-success gumb">
            <IoIosAdd size={25} /> Dodaj
          </Link>
        </Col>
      </Row>

      <Row>
        {gosti && Array.isArray(gosti) &&
          gosti.map((gost) => (
            <Col key={gost.sifra} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: "1rem" }}>
                <Card.Body>
                  <Card.Title>
                    {gost.ime} {gost.prezime}
                  </Card.Title>
                  <Card.Text>
                    Email: {gost.email} <br />
                    Telefon: {gost.brojTelefona}
                  </Card.Text>
                  <Row>
                    <Col>
                      <Link className="btn btn-primary gumb" to={`/gosti/${gost.sifra}`}>
                        <FaEdit />
                      </Link>
                    </Col>
                    <Col>
                      <Button variant="danger" className="gumb" onClick={() => obrisi(gost.sifra)}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      {gosti && gosti.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination size="lg">
            <Pagination.Prev onClick={smanjiStranicu} disabled={stranica === 1} />
            <Pagination.Item disabled>{stranica}</Pagination.Item>
            <Pagination.Next onClick={povecajStranicu} disabled={gosti.length < 7} />
          </Pagination>
        </div>
      )}
    </>
  );
}