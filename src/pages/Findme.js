import React from 'react'
import { Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import firebase from '../Firebase/config'
import './Findme.css'

///icons
import youtubeIcon from '../imgs/youtube.svg'
import facebookIcon from '../imgs/facebook.svg'
import instagramIcon from '../imgs/instagram.svg'
import twitterIcon from '../imgs/twitter.svg'
import linkedinIcon from '../imgs/linkedin.svg'
import tiktokIcon from '../imgs/tiktok.svg'





export default function Findme() {
const [showFB, setShowFB] = useState(false);
const [showINS, setShowINS] = useState(false);
const [showTIK, setShowTIK] = useState(false);
const [showTWI, setShowTWI] = useState(false);
const [showLIN, setShowLIN] = useState(false);
const [showYou, setShowYou] = useState(false)

// handle modals
const handleCloseFB = () => setShowFB(false);
const handleShowFB = () => setShowFB(true);
const handleCloseINS = () => setShowINS(false);
const handleShowINS = () => setShowINS(true);
const handleCloseTWI = () => setShowTWI(false);
const handleShowTWI = () => setShowTWI(true);
const handleCloseTIK = () => setShowTIK(false);
const handleShowTIK = () => setShowTIK(true);
const handleCloseLIN = () => setShowLIN(false);
const handleShowLIN= () => setShowLIN(true);
const handleCloseYou = () => setShowYou(false);
const handleShowYou= () => setShowYou(true);


const [data, setData] = useState([])
const [isPending] = useState(false)
const [error] = useState(false)


const [loader, setLoader] = useState(true)


const ref = firebase.firestore().collection('socialmedia')

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

const [linkedin, setLinkedIn] = useState('') 
const [facebook, setFacebook] = useState('') 
const [instagram, setInstagram] = useState('')  
const [twitter, setTwitter] = useState('') 
const [tiktok, setTikTok] = useState('')
const [youtube, setYouTube] = useState('')


function editDoc(uptdDoc) {
  ref.doc("socialmediaAll")
  .update(uptdDoc)
  .catch((err) => {
   console.error(err);
  })
}

  return (
    <div className='findme'>
      <h2 className='title'> Here you can follow me! </h2> 
      <h2 className='subtitle' >Click on the icons to edit</h2>
      <>
      <Modal show={showFB} onHide={handleCloseFB}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your Facebook page</Form.Label>
              <p className='modalsmalltext'>facebook.com/</p>
              <Form.Control
                type="text"
                placeholder="mybrew"
                autoFocus
                onChange={(e) => setFacebook(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFB}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ facebook:facebook })
            setShowFB(false)}}>
            add
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <>
      <Modal show={showYou} onHide={handleCloseYou}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your YouTube Channel Name or ID
                <p className='modalsmalltext'>youtube.com/channel/</p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="myBrew"
                autoFocus
                onChange={(e) => setYouTube(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseYou}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ youtube:youtube })
            setShowYou(false)}}>
            add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    <>
      <Modal show={showINS} onHide={handleCloseINS}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your Instagram name</Form.Label>
              <p className='modalsmalltext'>instagram.com/</p>
              <Form.Control
                type="text"
                placeholder="mybrew"
                autoFocus
                onChange={(e) => setInstagram(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseINS}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ instagram:instagram })
            setShowINS(false)}}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <>
      <Modal show={showTWI} onHide={handleCloseTWI}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your Twitter username</Form.Label>
             <p className='modalsmalltext'>twitter.com/</p>
              <Form.Control
                type="text"
                placeholder="myBrew"
                autoFocus
                onChange={(e) => setTwitter(e.target.value)} 

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTWI}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ twitter:twitter  })
            setShowTWI(false)}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <>
      <Modal show={showTIK} onHide={handleCloseTIK}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your TikTok channel</Form.Label>
              <p className='modalsmalltext'>tiktok.com/</p>
              <Form.Control
                type="text"
                placeholder="@mybrew"
                autoFocus
                onChange={(e) => setTikTok(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTIK}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ tiktok:tiktok })
            setShowTIK(false)}}>
          Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <>
      <Modal show={showLIN} onHide={handleCloseLIN}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>add your LinkedIn page</Form.Label>
              
              <p className='modalsmalltext'>linkedin.com/in/</p>
              <Form.Control
                type="text"
                placeholder="myBrew"
                autoFocus
                onChange={(e) => setLinkedIn(e.target.value)}
                />
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLIN}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {
            editDoc({ linkedin:linkedin })
            setShowLIN(false)}} >
          Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <div >
        {error && <p className='error'> {error} </p>}
        {isPending && <p className='loading'> Loading... </p>}
        {loader === false && data.map((dev) => (
          <div key={dev.id}> 
        <div>
        <div>
        </div>
        <div>

        <div className='groupBox'>
        <div><img alt='' className='socialicon'onClick={handleShowYou} src={youtubeIcon}/></div> <div className='you'> 
        <a  href={`https://www.youtube.com/channel/${dev.youtube}`} target="_blank" rel="noreferrer"> {dev.youtube} </a></div>

        <div> <img alt='' className='socialicon' onClick={handleShowFB} src={facebookIcon}/></div>
        <div className='fb'> <a  href={`https://www.facebook.com/${dev.facebook}`} target="_blank" rel="noreferrer"> {dev.facebook} </a>
        </div>
        <div> <img alt=''  className='socialicon' onClick={handleShowTIK} src={tiktokIcon}/></div>
        <div className='tik'><a  href={`https://www.tiktok.com/${dev.tiktok}`} target="_blank" rel="noreferrer" > {dev.tiktok} </a></div>


        <div><img alt='' className='socialicon'  onClick={handleShowINS} src={instagramIcon}/> </div>
        <div className='ins'><a  href={`https://www.instagram.com/${dev.instagram}`} target="_blank" rel="noreferrer"> {dev.instagram} </a></div>

        <div><img alt='' className='socialicon' onClick={handleShowTWI} src={twitterIcon}/></div>
        <div className='twi' ><a  href={`https://twitter.com/${dev.twitter}`} target="_blank" rel="noreferrer">{dev.twitter} </a></div>


        <div><img alt='' className='socialicon' onClick={handleShowLIN} src={linkedinIcon}/> </div>
        <div className='lin'> <a href={`https://www.linkedin.com/in/${dev.linkedin}`} target="_blank" rel="noreferrer">{dev.linkedin}</a></div>
        
</div>

</div>
</div>
  
        </div>




        
        ))}
  
  
  
  
      </div>


    </div>
  )
}


