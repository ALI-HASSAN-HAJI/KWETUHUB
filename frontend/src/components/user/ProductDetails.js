import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import publicApi from '../../api/publicApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import privateApi from '../../api/privateApi';
import Alert from 'react-bootstrap/Alert';
import Navbar from './NavBar';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1)
  const [cartMessage, setCartMessage] = useState(null)
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(id);
  const getProduct = async () => {
    // const { data } = await publicApi.get('product');
    const { data } = await publicApi.get(`product/${id}`);
    console.log(data);
    setProduct(data);
  }

  const addToCart = async () => {
    if(count < 1) {
      setCartMessage('Quantity should not be less than 1')
      setTimeout(() => {
      setCartMessage(null)
  }, 3000);
  } else {
    const { data } = await privateApi.post(`/product/addtocart/${id}`, {quantity: count})
        console.log(data)
        setCartMessage(data.message)
        setTimeout(() => {
        setCartMessage(null)
        }, 3000);
  }
  }
    
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
    <Navbar />
    <div>
       <Container>
        {
          cartMessage?
          <Alert variant='primary'>
            {cartMessage}
          </Alert>
          : null
        }
       <h3>Product Details</h3>
      <Row>
        <Col xs={8}>
       
       <div style={styles.imgCont} className="mb-3">
       <img style={styles.img} src={backendUrl + product.image} alt="phone photo"/>
       </div>
        
       <div style={styles.imgsCont}>
          {
            // ternary operator;
            product.images?
            product.images.map((photo) => {
              return(
                  <img style={styles.imgs} src={backendUrl + photo} alt="phone photo"/>
              )
            })
            :null
          }
           </div>

        </Col>
        <Col>
        <div>
        <h3 style={styles.name}>{product.name}</h3> 
        <h2 style={styles.h2}>{product.currency} {product.price}
        <button style={styles.btn1}onClick = {() => setCount(count + 1)}> <AddIcon /> </button> 
        <span> {count} </span>
         <button style={styles.btn1}onClick = {() => setCount((prevCount) => (Math.max(prevCount - 1,0 )))}> <RemoveIcon /> </button>
        </h2>
        <button style={styles.btn2} onClick={addToCart}>Add to Cart</button>
        <p style={styles.p}> <ShoppingCartIcon /></p>
        </div>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  )
}

const styles = {
  imgCont: {
   display: 'flex',
   //centering like this only works when display is flex;
   justifyContent: 'center',//center elements inside on the x axis;
   alignItems: 'center',//centers elements inside on the y axis;
   background: 'rgba(0, 0, 0, 0.3)',
   height: '65vh'
  },
  imgsCont: {
   display: 'flex',
   justifyContent: 'space-between',
  },
  imgs: {
   width: '23%',
   height: '100px'
  },
  h2: {
    marginTop: '220px',
    width: '100%',
    
  },
  img: {
    width: '450px',
    height: '300px'
  },
  name: {
    marginTop: '-5px'
  },
  btn1: {
    backgroundColor: '#FF5733',
    padding: '3px 9px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    color: 'white'
    
  },
  btn2: {
    backgroundColor: '#FF5733',
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    padding: '8px',
    marginTop: '150px'
  },
  p: {
    color: 'white',
    marginTop: '-34px',
    marginLeft: '70px'
  },
  // decrement: {
  //   backgroundColor: '#FF5733',
  //   border: 'none',
  //   borderRadius: '5px',
  //   color: 'white',
  //   padding: '0 15px',
  //   textAlign: 'center'
  // }
}

export default ProductDetails;
