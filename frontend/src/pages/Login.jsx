import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function Login() {
  const [prijavljeniPodaci, setPrijavljeniPodaci] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    const email = podaci.get('email');
    const lozinka = podaci.get('lozinka');

    // Simulacija prijave (bez stvarne autentifikacije)
    setPrijavljeniPodaci({ email, lozinka });
  }

  return (
    <Container className='mt-4'>
      <p>email: stojancaric8@gmail.com</p>
      <p>lozinka: Rinolan1</p>

      {prijavljeniPodaci ? (
        <div>
          <p>Prijavljeni ste s:</p>
          <p>Email: {prijavljeniPodaci.email}</p>
          <p>Lozinka: {prijavljeniPodaci.lozinka}</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              placeholder='stojancaric8@gmail.com'
              maxLength={255}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='lozinka'>
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type='password' name='lozinka' required />
          </Form.Group>
          <Button variant='primary' className='gumb' type='submit'>
            Autoriziraj
          </Button>
        </Form>
      )}
    </Container>
  );
}