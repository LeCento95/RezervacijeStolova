import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import Service from "../../services/JelovnikService";
import { useEffect, useState } from "react";
import { PRODUKCIJA, RouteNames } from "../../constants";
import { Link } from "react-router-dom";

import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

export default function JelovniciPregled() {

    const [jelovnici, setJelovnici] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState("");
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function dohvatiJelovnike() {
        showLoading();
        const odgovor = await Service.traziStranicenje(stranica, uvjet);
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        if (odgovor.poruka.length === 0 && stranica > 1) {
            setStranica(stranica - 1);
            return;
        }
        setJelovnici(odgovor.poruka);
    }

    useEffect(() => {
        dohvatiJelovnike();
    }, [stranica, uvjet]);

    async function obrisiAsync(sifra) {
        showLoading();
        const odgovor = await Service.obrisi(sifra); 
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        dohvatiJelovnike();
    }

    function obrisi(sifra) {
        obrisiAsync(sifra);
    }

    function slika(jelovnik) {
        if (!jelovnik?.slika) return "";
        return `${PRODUKCIJA}${jelovnik.slika}?${Date.now()}`;
    }

    function formatPrice(price) {
        return `${Number(price).toFixed(2)} €`;
    }

    function promjeniUvjet(e) {
        if (e.key === "Enter") {
            const noviUvjet = e.target.value;
            if (noviUvjet.length >= 3) {
                setStranica(1);
                setUvjet(noviUvjet);
                setJelovnici([]);
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

    return(
        <>
           <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                    type='text'
                    name='trazilica'
                    placeholder='Dio naziva jela [Enter]'
                    maxLength={255}
                    defaultValue=''
                    onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col key={2} sm={12} lg={4} md={4}>
                    {jelovnici && jelovnici.length > 0 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination size="lg">
                                <Pagination.Prev onClick={smanjiStranicu} disabled={stranica === 1} />
                                <Pagination.Item disabled>{stranica}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={povecajStranicu} disabled={jelovnici.length < 7}
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RouteNames.POLAZNIK_NOVI} className="btn btn-success gumb">
                        <IoIosAdd
                        size={25}
                        /> Dodaj
                    </Link>
                </Col>
            </Row>
            
                
            <Row>
                
            { jelovnici && jelovnici.map((j) => (
           
           <Col key={j.sifra} sm={12} lg={3} md={3}>
                <Card style={{ marginTop: '1rem' }}>
                    {j.slika && (
                <Card.Img variant="top" src={slika(j)} className="slika" />
                )}
            <Card.Body>
            <Card.Title>
                        {j.nazivJela} | {j.kategorija} | {Number(j.cijena).toFixed(2)} €</Card.Title>
            <Card.Text>{j.kolicina}</Card.Text>
            <Row>
                <Col>
                    <Link className="btn btn-primary gumb" to={`/jelovnici/${j.sifra}`}>
                        <FaEdit />
                    </Link>
                </Col>
                <Col>
                    <Button variant="danger" className="gumb" onClick={() => obrisi(j.sifra)}>
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
</Col>
          ))
      }
      </Row>
      <hr />
              {jelovnici && jelovnici.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                    <Pagination.Prev onClick={smanjiStranicu} disabled={stranica === 1} />
                    <Pagination.Item disabled>{stranica}</Pagination.Item> 
                    <Pagination.Next
                        onClick={povecajStranicu} disabled={jelovnici.length < 7}
                    />
                    </Pagination>
                </div>
                )}
        </>
    )

}

    