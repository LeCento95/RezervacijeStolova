import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarRestorantReservation from './components/NavBarRestorantReservation'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import GostiPregled from './pages/gosti/GostiPregled'
import GostiDodaj from './pages/gosti/GostiDodaj'
import GostiPromjena from './pages/gosti/GostiPromjena'
import GostiBrisanje from './pages/gosti/GostiBrisanje'




function App() {

  return (
    <>
      <Container>
        <NavBarRestorantReservation />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.GOST_PREGLED} element={<GostiPregled />} />
          <Route path={RouteNames.GOST_NOVI} element={<GostiDodaj />} />
          <Route path={RouteNames.GOST_PROMJENA} element={<GostiPromjena />} />
          <Route path={RouteNames.GOST_BRISANJE} element={<GostiBrisanje />} />
        </Routes>

        <hr />
        &copy; RestorantReservation 2025
      </Container>
     
    </>
  )
}

export default App