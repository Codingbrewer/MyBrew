
import '../App.css';
import './NavbarTop.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Home from '../pages/Home';
import Story from '../pages/Story';
import Recipes from '../pages/Recipes';
import Findme from '../pages/Findme';
import Create from '../pages/Create';
import Recipe from '../pages/Recipe';
import Editor from '../pages/Editor';
import firebase from '../Firebase/config'
import { useState } from 'react';
import {useEffect} from 'react';
import beanwhite from '../imgs/beanwhite.png'




function NavbarTop() {

  function getData(){
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
      items.push(doc.data())
   })
   setData(items)
   setLoader(false)
  })
  }
  
  
  useEffect(() => {
    getData()
  }, [])
  

const ref = firebase.firestore().collection('profile')

const [data, setData] = useState([])
const [isPending, setIsPending] = useState(false)
const [error, setError] = useState(false)


const [loader, setLoader] = useState(true)

const [expanded, setExpanded] = useState(false);

  return (
    <BrowserRouter>

{error && <p className='error'> {error} </p>}
        {isPending && <p className='loading'> Loading... </p>}
        {loader === false && data.map((dev) => (
          <div key={dev.id}> 

<Navbar expanded={expanded}  className='navbar' bg="dark" variant="dark" sticky='top' expand="lg">
  <Container>
    <Navbar.Brand className='myName' style={{fontSize:'2rem', color: '#a5ccdd'}} href="/home" >{dev.name}'s Blog </Navbar.Brand>
    <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
    <Navbar.Collapse>
      <Nav
        className="mx-auto"
      >
 <Nav.Link onClick={() => setExpanded(false)}  as={Link} to="/Home">HOME</Nav.Link>
 <img  className='beanwhitesmall' src={beanwhite}/>
    <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/Story">MY STORY</Nav.Link>
    <img  className='beanwhitesmall' src={beanwhite}/>
      <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/Recipes">MY RECIPES</Nav.Link>
      <img  className='beanwhitesmall' src={beanwhite}/>
      <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/Findme">FOLLOW ME</Nav.Link>
      </Nav>
      <Nav>
      <Nav.Link onClick={() => setExpanded(false)} eventKey={2} as={Link} to="/Editor">
        Edit
      </Nav.Link>
    </Nav>
      
    </Navbar.Collapse >
  </Container>
</Navbar>


<div>
 
       <Navbar />

      <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/Story" element={<Story />} />
      <Route path="/Recipes" element={<Recipes />} />
      <Route path="/Findme" element={<Findme />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/Editor" element={<Editor />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      
          </Routes>
    
      </div>
      </div>
))}
 </BrowserRouter> );
}

export default NavbarTop;



