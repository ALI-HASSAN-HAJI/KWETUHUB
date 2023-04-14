import React, { useEffect, useState } from "react";
import publicApi from "../../api/publicApi";
import shopping from '../../images/shopping.png';
import logo from '../../images/logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



const Practice = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;//it should come from .env file and it shouldn't imported above and should not installed
  console.log(backendUrl)
  
  const fetchData = async () => {
    const { data } = await publicApi.get('product');
    console.log(data);
    setProducts(data);

  }

  useEffect(() => {
    fetchData()
  }, [])
  return(
    <>
    <div className="mb-3">
    <img style={styles.heroImage} src={shopping} alt="hero image"/>
    <img style={styles.logo} src={logo} alt="logo"/>
    </div>

    <Container>
      <Row>
        <Col  xs={3}>
          {/* Categories */}
          <h3 style={styles.h3}>Product Categories</h3>
          <div style={styles.button}>
          <button style={styles.btn2}>Clothing</button>
          <button style={styles.btn2}>Furniture</button>
          <button style={styles.btn2}>Jewellery</button>
          <button style={styles.btn2}>Men's Clothing</button>
          <button style={styles.btn2}>Watches</button>
          <button style={styles.btn2}>Toys</button>
          <button style={styles.btn2}>Women's Clothing</button>
      
        </div>
      
        </Col>
        <Col>
        <Row xs={1} md={4} className="g-4">
      {products.map((product) => (
        <Col>
        {/* Cards */}
          <Card>
            <Card.Img variant="top" src={backendUrl + product.image} style={styles.img} />
            <Card.Body>
              <Card.Title style={styles.name}>{product.name}</Card.Title>
              <Card.Text style={styles.price}>{product.currency} {product.price}</Card.Text>
              <a href={`/practice/${product._id}`} style={styles.btn}>View</a>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
        </Col>
      </Row>
      
    </Container>
    
 </>
  )
}

const styles = {
  heroImage: {
    height: '100%',
    width: '100vw'
  },
  logo: {
    position: 'absolute',
    top: '50px',
    // zIndex: 1,
    left: '50px',
    width: '300px'
  },
  img: {
   height: '200px',
   width: '190px'
  },
  btn: {
    border: 'none',
    padding: '10px 20px',
    width: '100%',
    backgroundColor: '#FF5733',
    color: '#fff',
    fontWeight: '500',
    borderRadius: '10px',
    display: 'block',
    textDecoration: 'none',
    textAlign: 'center'
  },
  name: {
    textAlign: 'center'
  },
  price: {
    textAlign: 'center'
  },
  button: {
 
  },
  btn2: {
    display: 'block',
    background: 'none',
    border: 'none',
    padding: '20px 10px'
  },
  h3: {
    textDecoration: 'underline',
    padding: '0 10px'
  }
}

export default Practice;