import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import privateApi from '../../api/privateApi';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" style={styles.nav}>
      <span style={styles.cartQuantity}>1</span>
      <a href='/cartdetails' style={styles.cart}><ShoppingCartIcon /></a>
    </Navbar>
  )
}

const styles = {
  nav: {
    background: '#fff',
    height: '60px',
    boxShadow: '10px 10px 43px 0px rgba(0,0,0,0.2)',
    marginBottom: '30px',
    paddingRight: '30px'
  }, 
  cart: {
    color: '#000'
  },
  cartQuantity: {
    margin: '-20px -40px 0 auto',
    color: '#fff',
    background: '#000',
    height: '15px',
    width: '15px',
    textAlign: 'center',
    borderRadius: '50%',
    fontSize: '0.7em'
  }
}

export default NavBar
