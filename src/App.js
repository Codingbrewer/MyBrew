
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import Home from './pages/Home';
import Story from './pages/Story';
import Recipes from './pages/Recipes';
import Findme from './pages/Findme';
import NavbarTop from './Components/NavbarTop';
import Footer from './Components/Footer';
function App() {
  return (
    
    <div className="App">

<NavbarTop />

<footer>

  <Footer/>
</footer>

</div>
     );
}

export default App;

