import React from 'react'
import firebase from '../Firebase/config'
import { useState } from 'react';
import {useEffect} from 'react';
import coffeebeans from '../imgs/threebeans.png'
import './Story.css'



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
    getData()})
  

  const ref = firebase.firestore().collection('profile')

const [data, setData] = useState([])
const [isPending] = useState(false)
const [error ] = useState(false)


const [loader, setLoader] = useState(true)



  return (
    
<div className='story' >
<h2 className='title'> My Story</h2>
{error && <p className='error'> {error} </p>}
        {isPending && <p className='loading'> Loading... </p>}
        {loader === false && data.map((dev) => (
          <div key={dev.id}> 
    
 <div className='storycontent'>
  <img alt='' className='storyimg' src={dev.urlabout} />
  <p className='storytext' > {dev.story}
  <hr style={{ width: '25%'}}></hr>
</p>
<h2 className='coffeeicon'> <img alt='' src={coffeebeans} /> </h2>
</div>
</div>
))}

    </div>
  )
  }
