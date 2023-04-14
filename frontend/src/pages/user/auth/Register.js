import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import publicApi from '../../../api/publicApi';


const Register = () => {
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: ''
  });
 const submitData = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if(form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true)
  if (repeatPassword === formData.password){
    const { data } = await publicApi.post('signup', formData);
    console.log(data);
    window.open('/login', '_self')//This will take you to home page
     // console.log('submitting data'); 
  } else {
    setPasswordError('password must be same');
  }
 
 
 }


  // const getData = async () => {
  //   const { data } = await publicApi.post('signup', formData);
  //   console.log(data);
  //   setFormData(data) 
  // }

  // useEffect(() => {
  //   getData()
  // }, []);
  // console.log(formData)
  return (
<div style={styles.divCont}>
  <Form onSubmit={submitData} style={styles.form} noValidate validated={validated}>
    <div style={styles.divHead}>
            <h1 style={styles.h1}>Create an Account</h1>
      <Row>
          <Col>
             <Form.Label>First Name</Form.Label>
             <Form.Control className='mb-3' id="First name" 
             value={formData.firstName}
             onChange={(e) => setFormData({...formData, firstName: e.target.value})} required/>
             <Form.Control.Feedback type='invalid'>please add firstname</Form.Control.Feedback>
          </Col>
          <Col>
             <Form.Label >Last Name</Form.Label>
             <Form.Control className='mb-2' id="Last name" 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} required/>
              <Form.Control.Feedback type='invalid'>please add lastname</Form.Control.Feedback>
          </Col>
      </Row>
      <Row>
          <Col>
             <Form.Label >Email</Form.Label>
             <Form.Control className='mb-3' id="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
              <Form.Control.Feedback type='invalid'>please add email</Form.Control.Feedback>
          </Col>
      </Row>
      <Row>
          <Col>
              <Form.Label >Date of Birth</Form.Label>
              <Form.Control type="date" id="date of birth" 
               value={formData.dateOfBirth}
               onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} required/>
               <Form.Control.Feedback type='invalid'>please add Date of Birth</Form.Control.Feedback>
          </Col>
          <Col>
              <Form.Label >Gender</Form.Label>
              <Form.Select  onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
              {/* <Form.Control className='mb-3' id="gender" 
               value={formData.gender}
               onChange={(e) => setFormData({...formData, gender: e.target.value})}/> */}
          </Col>
      </Row>
      <Row>
          <Col>
              <Form.Label >Password</Form.Label>
              <Form.Control type='password' className='mb-3' id="password" 
               value={formData.password}
               onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
               <Form.Control.Feedback type='invalid'>please add password</Form.Control.Feedback>
          </Col>
          <Col>
              <Form.Label >Repeat Password</Form.Label>
              <Form.Control type='password' className='mb-3' id="password" 
               value={repeatPassword}
               onChange={(e) => setRepeatPassword(e.target.value)} required/>
               <Form.Control.Feedback type='invalid'>please add repeatPassword</Form.Control.Feedback>
               {/* {passwordError?<p>{passwordError}</p>:null} */}
               {passwordError?<p style={styles.p}>{passwordError}</p> : null}
          </Col>
      </Row>
      <Row>
          <Col>
              <button style={styles.btn}>Register</button>
          </Col>
      </Row>
    </div> 
  </Form>   
</div>
  )
}

const styles = {
  divCont: {
    background: '#F07300',
    height: '100vh',
  },
  form: {
    background: '#ffff',
    marginLeft: '25%',
    marginRight: '25%',
    width: '50%',
    height: '75%',
    position: 'absolute',
    marginTop: '50px'
  },
  divHead: {
  margin: 'auto 15px',
  marginBottom: '-50px'
  },
  h1: {
    textAlign: 'center',
    marginTop: '35px'
  },
  btn: {
    width: '100%',
    background: '#f07300',
    marginTop: '15px',
    padding: '5px',
    color: 'white',
    fontSize: '22px',
    border: 'none',
    borderRadius: '5px',
  },
  p: {
    color: 'red',
    fontSize: '12px'
  }
}

export default Register
