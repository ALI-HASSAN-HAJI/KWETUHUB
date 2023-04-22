import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import publicApi from '../../api/publicApi';
import privateApi from '../../api/privateApi';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [locationName, setLocationName] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPickupPoints = async () => {
    const { data } = await publicApi.get('/pickuppoint');
    console.log(data)
    setPickupPoints(data.data)
  }

  const findLocationNames = (e) => {
    const locationNames = pickupPoints.filter((pickupPoint) => {
      return pickupPoint.location === e
    });
    console.log(locationNames)
    setLocationName(locationNames)
  }

  const checkout = async (e) => {
    e.preventDefault();
    const { data } = await privateApi.post('/cart/checkout');
    console.log(data)
    if(data.message === 'Checked out successfully'){
      // display alert
      // with 3 seconds
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }

  useEffect(() => {
   getPickupPoints();
  }, [])

  return (
    <>

      
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <button style={styles.primaryBtn} onClick={handleShow}>proceed to checkout <ArrowRightAltIcon /></button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body> 

          <Form onSubmit={checkout}>  
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Pick checkout location</Form.Label>
              <Form.Select required onChange={(e) => findLocationNames(e.target.value)}>
                <option></option>
                {
                  pickupPoints.map((pickupPoint) => {
                    return(
                      <option value={pickupPoint.location}>{pickupPoint.location}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>

            {
              locationName?
              <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>choose pick up point</Form.Label>
              <Form.Select required>
                <option></option>
                {
                  pickupPoints.map((pickupPoint) => {
                    return(
                      <option value={pickupPoint.name}>{pickupPoint.name}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            : null

            }
            <button style={styles.primaryBtn}>Checkout</button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  primaryBtn: {
    display: 'flex',
    margin: 'auto',
    background: 'black',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 80px'
  }
}

export default CheckoutModal;