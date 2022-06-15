import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Card, CardGroup } from 'react-bootstrap';
import { projectFirestore } from '../Firebase/config2'



// styles
// import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError(`Could not find that recipe`)
      }
    })

    return () => unsub()

  }, [id])

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      projectFirestore.collection('recipes').doc(id).delete();
      navigate("/Recipes");
    }
    else {
        console.log("not deleted")
    }

  }


  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  return (
    <div >
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>

<CardGroup>
  <Card className='singleRecipe' >
    <Card.Img className='fullimg' variant="top" src={recipe.url} />
    <Card.Body>
    <Card.Title>{recipe.brewName}</Card.Title>
      <Card.Title>{recipe.title}</Card.Title>
      <Card.Text>
      {recipe.shortDes}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
     <div className='footerCard'>
     <small className="text-muted">Brew time:<h2>{recipe.brewingTime}</h2> minutes</small>
     <small className="text-muted">Ratio:<h2>1:{recipe.ratio}</h2></small>
     </div>

    </Card.Footer>
  </Card>
  <Card className='singleRecipe'>
    <Card.Body>
      <Card.Text>
      {recipe.method}
      </Card.Text>
    </Card.Body>
    <Button variant="dark" onClick={handleDelete} >Remove recipe</Button>
  </Card>
</CardGroup>

        </>
      )}


    </div>
  )
}