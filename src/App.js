import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from './Components/NavbarTop';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

function App() {
  return (
    
    <div className="App">

<NavbarTop />

    <BrowserRouter>
  <Routes>
    <Route
        path="*"
        element={<Home />}
    />
  </Routes>
</BrowserRouter>

    
<footer>

  <Footer/>
</footer>

</div>
     );
}

export default App;


