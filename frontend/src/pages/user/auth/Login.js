import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import publicApi from '../../../api/publicApi';
import Cookies from 'js-cookie';// This should be installed and its for the purpose of login

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({email:'', password:''});


  const login = async (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true)
    e.preventDefault();
   try {
    const {data} = await publicApi.post('signin', formData);
    console.log(data)
    if(data.message === 'User authenticated') {
      Cookies.set('token', data.token)
      window.open('/', '_self')//This will take you to home page
    }
   // console.log(formData); 
   } catch (error) {
    console.log(error);
   }
   
  }
  return (
    <div style={styles.divCont}>
      <Form style={styles.form} noValidate validated={validated} onSubmit={login}>
        <div style={styles.divForm}>
      <h1 style={styles.h1}>Login</h1>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label for="email">Email</Form.Label>
        <Form.Control type="email" id="email" value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
        <Form.Control.Feedback type='invalid'>please add email</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label for="password">Password</Form.Label>
        <Form.Control type="password" id="password" value={formData.password} 
        onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
        <Form.Control.Feedback type='invalid'>please add Password</Form.Control.Feedback>
      </Form.Group>
      <button style={styles.btn}>Login</button>
      </div>
    </Form>
    </div>
  ) 
}

const styles = {
  divCont: {
  background: '#F07300',
  height: '100vh'
  },
  form: {
    background: '#ffff',
    width: '40%',
    marginLeft: '25%',
    marginRight: '25%',
    height: '55%',
    position: 'absolute',
    marginTop: '100px'
  },
  btn: {
    background: '#F07300',
    width: '100%',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '8px',
    fontSize: '20px'
  },
  divForm: {
    margin: '20px',
  },
  h1: {
    textAlign: 'center'
  }
}

export default Login;
