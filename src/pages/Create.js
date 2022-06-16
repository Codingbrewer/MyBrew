import { useState} from 'react'
import { Button, Form, Row , Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { projectFirestore } from '../Firebase/config2'
import { projectStorage } from '../Firebase/config2'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [shortDes, setShortDes] = useState('')
  const [brewingTime, setBrewingTime] = useState('')
  const [ratio, setRatio] = useState('')
  const [method, setMethod] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)

 

  const navigate = useNavigate();


  const notify = (e) => {
    toast.success("uploaded! 👍", {
    position: 'top-center',
    autoClose: 2500,
    draggable: true,
             
    })
    

  }


  const creatDoc = async (e) => {
    e.preventDefault()
    const doc = {title, shortDes, brewingTime, method, ratio, url}
    
    try {
     await projectFirestore.collection('recipes').add(doc)

     navigate("/Recipes");
  
    
    } catch(err) {
      console.log(err)
    }
    }


    const handleChange2 = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);

        }
      };

    const handleUpload = (e) => {
        e.preventDefault()
        const uploadTask = projectStorage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
           
          },
          error => {
            console.log(error);
          },
          () => {
            projectStorage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
              setUrl(url)

              notify();

              });
          }
        );
      };
  



return (


    <Form className='create' >
        <ToastContainer/>

        <h2 className='title'>Add a recipe!</h2>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label className="inputTitle" >Recipe Title</Form.Label>
      <Form.Control
      type="text"
      autoFocus
      placeholder="Pour over coffee"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      />

    </Form.Group>
  </Row>

  <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
    <Form.Label className="inputTitle" >Short description</Form.Label>
    <Form.Control 
    style={{ height: 70 }} 
    as="textarea"
    rows={2} 
    className='input' 
    placeholder="Great filter for the summer using natural ethiopian beans roasted by ThePig coffee roasters NYC"
    onChange={(e) => setShortDes(e.target.value)}
    value={shortDes}
    />
  </Form.Group>


  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label className="inputTitle" >Brewing time</Form.Label>
    <Form.Control 
    type="number" 
    placeholder="12 Min" 
    onChange={(e) => setBrewingTime(e.target.value)}
    value={brewingTime}/>
  </Form.Group>

  <Row className="mb-3">
   
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label className="inputTitle"  >Ratio - 1:</Form.Label>
      <Form.Control 
      type="number" 
      placeholder="16" 
      onChange={(e) => setRatio(e.target.value)}
      value={ratio}/>

    </Form.Group>

    </Row>

<Row >
    <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
    <Form.Label className="inputTitle" >Method</Form.Label>
    <Form.Control 
    style={{ height: 100 }}  
    as="textarea" 
    rows={2} 
    className='input' 
    placeholder="1. Grind your beans around medium size. 2.Wash your paper filter using cold water "
    onChange={(e) => setMethod(e.target.value)}
    value={method}
    />
  </Form.Group>

  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Add a photo</Form.Label>
    <div className='upload'>
    <Form.Control className='upload-file' type="file" onChange={handleChange2}/>
    <button className='upload-btn' onClick={handleUpload} > upload </button>
    </div>
    <progress value={progress} max="100"/>
  </Form.Group>
  
  </Row>

  <Row >
<div className='buttons'>
  <Link className='link' to='/Recipes'> <Button variant="dark" type="submit">
    Cancle
  </Button> </Link>

  <Button onClick={creatDoc}
  variant="dark" type="submit">
    Add recipe!
  </Button>

  </div>
  </Row>
</Form>


)













  }
