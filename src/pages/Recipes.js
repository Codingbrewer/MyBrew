import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './Recipes.css'
import { projectFirestore } from '../Firebase/config2'

import bean from '../imgs/bean.png'


export default function Recipes() {

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

   const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError('No info :(')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
      
          results.push({ ...doc.data(), id: doc.id })
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  }, [])

  const handleClick = (id) => {
    if (window.confirm('Are you sure you want to remove yout about text?')) {
      projectFirestore.collection('recipes').doc(id).delete()
      window.location.reload(true);

    } else {
       console.log('Item was not deleted');
    }
  }


  return (
    
    <div className='recipesbody'>
      
      <h1 className='title'> <img  className='rotate' src={bean}/> My Recipes <img className='rotate'  src={bean}/> </h1>
      <div className='recipesGrid' >

      {error && <p className='error'> {error} </p>}
      {isPending && <p className='loading'> Loading... </p>}
      {data && data.map(recipes => (
<>

<Card className='card' style={{ width: '18rem' }}>
  <Card.Img className='cardimg' variant="top" src={recipes.url}/>
  <Card.Body>
    <Card.Title>{recipes.title}</Card.Title>
    <Card.Text>
    
    </Card.Text>{recipes.shortDes.substring(0,100)}...
    <Card.Text>
   
    </Card.Text>
   
          <Link to={`/recipes/${recipes.id}`}> <Button variant="dark">Full recipe</Button></Link>
    
  </Card.Body>
</Card>




</>


      ))}

<Card className='card' style={{ width: '18rem', height: '6rem' }}>
         <Card.Body>

         <Link to='/Create'> <Button variant="dark">Add a recipe</Button> </Link>
  
  </Card.Body>
</Card>

</div>

</div>


      
      
)}
