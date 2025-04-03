import './Pocetna.css'; // Import CSS fajla
import logo from '../assets/LOGO_RMR.png'; // Import slike


export default function Pocetna() {
    
        const backgroundStyle = {
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80vh',
            width: '84vw',
        };

    return (
        <div style={backgroundStyle}>
            
            </div>
    );
}