import { useState, useRef, } from 'react'
import { Button, Form, Row , Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../Firebase/config'
import { projectStorage } from '../Firebase/config2'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// styles
import './Create.css'
import './Editor.css'

export default function Editor() {  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [urlabout, setUrlabout] = useState('')
  const [urlslide1, setUrlslide1] = useState('')
  const [urlslide2, setUrlslide2] = useState('')
  const [urlslide3, setUrlslide3] = useState('')
  const [progress, setProgress] = useState(0)
  const [story, setStory] = useState('')
  const [slide1, setSlide1] = useState('')
  const [slide2, setSlide2] = useState('')
  const [slide3, setSlide3] = useState('')


 
  const ref = firebase.firestore().collection('profile')

  const navigate = useNavigate();

  const notify = (e) => {
    toast.success("uploaded! 👍", {
    position: 'top-center',
    autoClose: 2500,
    draggable: true,
             
    })
    

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
              .then(urlabout => {
              setUrlabout(urlabout)

              notify();

              });
          }
        );
      };



      const handleUpload2 = (e) => {
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
              .then(urlslide1 => {
              setUrlslide1(urlslide1)

              notify();

              });
          }
        );
      };

      
    const handleUpload3 = (e) => {
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
            .then(urlslide2 => {
            setUrlslide2(urlslide2)

            notify();

            });
        }
      );
    };

    
    const handleUpload4 = (e) => {
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
            .then(urlslide3 => {
            setUrlslide3(urlslide3)

            notify();

            });
        }
      );
    };

      function editDoc(uptdDoc) {

        let updatedFields = {};
        Object.keys(uptdDoc).forEach((field) => {
            if (uptdDoc[field] && uptdDoc[field].length > 0) {
                updatedFields[field] = uptdDoc[field];
            }
        });

        ref.doc("profileData")
        .update(updatedFields)
        .catch((err) => {
         console.error(err);
        })
        navigate("/Home");
      }
  



return (

<div>
<h2 className='title'>Edit your profile</h2>
<ToastContainer/>
    <Form className='editForm' >    
  <Row className="mb-0">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label className="inputTitle" >Name</Form.Label>
      <Form.Control
      type="text"
      placeholder="Jenny"
      autoFocus
      onChange={(e) => setName(e.target.value)}
      value={name}
      />

<Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
    <Form.Label className="inputTitle" >Your story</Form.Label>
    <Form.Control 
    style={{ height: 250 }}  
    as="textarea" 
    rows={2} 
    className='input' 
    placeholder="My name is Jenny Pepper, a coffee fanatic based in the North West of Australia. I began my coffee journey in around 2015, I started going cycling locally, always with a flask of coffee"
    onChange={(e) => setStory(e.target.value)}
    value={story}
    />
  </Form.Group>
    </Form.Group>
    <Row className='slidetexts'>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label className="inputTitle">First slide Text </Form.Label>
      <Form.Control 
      type="text" 
      placeholder="My favorite brew is Chemex" 
      onChange={(e) => setSlide1(e.target.value)}
      value={slide1}/>

    </Form.Group>
    </Row>
    <Row className='slidetexts'>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label className="inputTitle"  >second slide Text</Form.Label>
      <Form.Control 
      type="text" 
      placeholder="Coffee helps me studying" 
      onChange={(e) => setSlide2(e.target.value)}
      value={slide2}/>

    </Form.Group>
    </Row>
    <Row className='slidetexts'>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label className="inputTitle"> Third slide Text</Form.Label>
      <Form.Control 
      type="text" 
      placeholder="When the day starts and ends" 
      onChange={(e) => setSlide3(e.target.value)}
      value={slide3}/>

    </Form.Group>
    
    </Row>
  </Row>


  <Row className="mb-0">
  <h3> Photos </h3>
  <Form.Group controlId="formFile" className="mb-0">
    <Form.Label className='uploadText' >About photo</Form.Label>
    <div className='uploadEditor'>
    <Form.Control className='uploadEditorFile' type="file" onChange={handleChange2}/>
    <button className='uploadEditorButton' onClick={handleUpload} > upload </button>
    </div>
   
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-0">
    <Form.Label>Slide show - first photo</Form.Label>
    <div className='uploadEditor'>
    <Form.Control className='uploadEditorFile' type="file" onChange={handleChange2}/>
    <button className='uploadEditorButton' onClick={handleUpload2} > upload </button>
    </div>
    
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-0">
    <Form.Label>Slide show - second photo</Form.Label>
    <div className='uploadEditor'>
    <Form.Control className='uploadEditorFile' type="file" onChange={handleChange2}/>
    <button className='uploadEditorButton' onClick={handleUpload3} > upload </button>
    </div>
    
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-0">
    <Form.Label>Slide show - third photo</Form.Label>
    <div className='uploadEditor'>
    <Form.Control className='uploadEditorFile' type="file" onChange={handleChange2}/>
    <button className='uploadEditorButton' onClick={handleUpload4} > upload </button>
    </div>
    <Form.Group controlId="formFile" className="mb-0">
    <div className='editorButtons'>
  <Link className='link' to='/Home'> <Button variant="dark" type="submit">
    Cancle
  </Button> </Link>

  <Button
  variant="dark" type="submit" 
  onClick={(e)=>{
  e.preventDefault()
  editDoc({ name, story, slide1:slide1, slide2:slide2, slide3:slide3, urlabout:urlabout, urlslide1:urlslide1, urlslide2: urlslide2, urlslide3:urlslide3  })}}>
    Save!
  </Button>

  </div>
  </Form.Group>
  </Form.Group>

    </Row>



</Form>

</div>

)













  }