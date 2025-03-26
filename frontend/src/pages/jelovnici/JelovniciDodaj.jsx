import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import Service from "../../services/JelovnikService";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function JelovniciDodaj() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  async function dodaj(podaci) {
    showLoading();
    const odgovor = await Service.dodaj(podaci);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.JELOVNIK_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    dodaj({
      nazivJela: podaci.get("nazivJela"),
      kategorija: podaci.get("kategorija"),
      cijena: parseFloat(podaci.get("cijena")),
    });
  }

  return (
    <>
      Dodavanje novoga jela u jelovnik
      <Form onSubmit={obradiSubmit}>
        <Form.Group className="mb-3" controlId="nazivJela">
          <Form.Label>Naziv jela</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite naziv jela"
            name="nazivJela"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="kategorija">
          <Form.Label>Naziv jelovnika</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite naziv jelovnika"
            name="kategorija"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" 
                step={0.01} 
                name="cijena"  
                />
            </Form.Group>

        <Button variant="primary" type="submit">
          Dodaj jelo
        </Button>
      </Form>
    </>
  );
}