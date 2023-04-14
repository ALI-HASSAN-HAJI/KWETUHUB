import React, {useEffect, useState} from 'react';
import publicApi from '../../api/publicApi';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import shopping from '../../images/shopping.png';

const Home = () => {
  const [data, setData] = useState([]);
 
  const getProducts = async () => {
    const { data } = await publicApi.get('product')
    setData(data)
    console.log(data);
  }
  useEffect(() => {
    getProducts()
  }, [])
  return(
    <div style={styles.container}>
      <h1 style={styles.h1}>Online </h1>
     <h1> <span style={styles.span2}>Shopping</span></h1>
      <img src={shopping} alt="shopping" style={styles.img1}/>

       <div style={styles.div1}>

        <div style={styles.filter}>
        <button style={styles.btn1}>Filter by Price</button>
        <span style={styles.spanFilter}>Price: $10 - $30</span>
        </div>
        <div style={styles.sidebar}>
          <button style={styles.btn2}>Product categories</button>
          <ul style={styles.ul}>
            <li><a  href='Clothing'>Clothing</a></li>
            <li><a  href='Furniture'>Furniture</a></li>
            <li><a  href='Jewellery'>Jewellery</a></li>
            <li><a  href='Mens Clothing'>Men's Clothing</a></li> 
            <li><a  href='Watches'>Watches</a></li>
            <li><a  href='Toys'>Toys</a></li>
            <li><a  href='Womens Clothing'>Women's Clothing</a></li>
          </ul>
        </div>
      <Row xs={1} md={4} className="g-4">
      { 
      data.map((item) => (
        <Col key={item._id}>
          <Card style={styles.card}>
            <Card.Img variant="top" src={'http://localhost:4000/' + item.image} style={styles.img}/>
            <Card.Body style={styles.body}>
              <Card.Title style={styles.name}>{item.name}</Card.Title>
              <Card.Text>
                <span style={styles.span}>{item.price} {item.currency}</span>
                <button type='submit' style={styles.button}>Add to cart</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  
      

    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    marginLeft: '50px'
    
  },
  img: {
    height: '250px',
  },
  body: {
  },
  span: {
    fontSize: '20px',
    marginLeft: '70px'
  },
  h1: {
    textAlign: 'center',
    position: 'absolute',
    fontStyle: 'italic',
    color: 'white',
    top: '50px',
    marginLeft: '100px'
  },
  button: {
    borderRadius: '10px',
    padding: '5px 10px',
    fontSize: '20px',
    backgroundColor: '#E74C3C',
    display: 'block',
    marginLeft: '60px'
  },
  card: {
    boxShadow: '10px 10px 30px 2px rgba(0,0,0,0.29)',
    
  },
  name: {
    textAlign: 'center'
  },
  img1: {
    height: '500px',
    width: '100%',
    margin: 0
  },
  div1: {
    marginLeft: '200px',
    marginRight: '40px',
    marginTop: '10px'
  },
  span2: {
    color: '#E74C3C',
    marginBottom: '30px',
    position: 'absolute',
    top: '100px',
    marginLeft: '200px',
    fontStyle: 'italic',
  },
  sidebar: {
    position: 'absolute',
    height: '100%',
    width: '200px',
    marginLeft: '-220px',
    marginTop: '10px'
  },
  spanFilter: {
    display: 'block'
  },
  filter: {
    marginLeft: '-220px',
    backgroundColor: '#E5E7E9',
    width: '200px',
  },
  ul: {
    listStyleType: 'none',
  },
  btn2: {
    margin: '0 auto',
    display: 'block',
    backgroundColor: '#E74C3C',
    color: 'white'
  },
  btn1: {
    margin: '0 auto',
    display: 'block',
    backgroundColor: '#E74C3C',
    color: 'white'
  },
  spanFilter: {
    marginLeft: '85px'
  },
  li: {
    padding: '20px',
    textDecoration: 'none'
  }
}

export default Home;