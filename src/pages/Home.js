import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../Firebase/config'
import { useState } from 'react';
import {useEffect} from 'react';
import './Home.css'


export default function Story() {

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
  })
  

  const ref = firebase.firestore().collection('profile')

const [data, setData] = useState([])
const [isPending] = useState(false)
const [error] = useState(false)


const [loader, setLoader] = useState(true)



  return (
    
<div className='home' >
{error && <p className='error'> {error} </p>}
        {isPending && <p className='loading'> Loading... </p>}
        {loader === false && data.map((dev) => (
          <div key={dev.id}> 

    <h2 className='title'>Welcome to {dev.name}'s Coffee-Blog </h2>
<Carousel className='slideShow'  fade>
  <Carousel.Item>
    <img
    style={{ width: "600px", height: "400px", objectFit: "cover"}}
      className="img-fluid"
      src={dev.urlslide1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h2 className='slideText'>{dev.slide1}</h2>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
    style={{ width: "600px", height: "400px", objectFit: "cover"}}
      className="img-fluid"
      src={dev.urlslide2}
      alt="Second slide"
    />

    <Carousel.Caption>
    <h2 className='slideText'>{dev.slide2}</h2>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="img-fluid"
      style={{ width: "600px", height: "400px", objectFit: "cover"}}
      src={dev.urlslide3}
      alt="Third slide"
    />

    <Carousel.Caption>
    <h2 className='slideText'>{dev.slide3}</h2>
      </Carousel.Caption>
      
  </Carousel.Item>
</Carousel>

</div>
))}

</div>
  )
}
