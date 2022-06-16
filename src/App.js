import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from './Components/NavbarTop';
import Footer from './Components/Footer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">

<NavbarTop />
    
    <BrowserRouter>
  <Routes>
    <Route
        path="/" element={<Navigate to="/Home" />}/>
  </Routes>
</BrowserRouter>
    
<footer>

  <Footer/>
</footer>

</div>
     );
}

export default App;


