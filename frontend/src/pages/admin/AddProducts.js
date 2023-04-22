import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import publicApi from '../../api/publicApi';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '', image: '', images: [], price: '', currency: '', quantity: '', category: [], discountPercentage: ''
  });

  // This function is meant for more images
  const saveFiles = (e) => {
    let imgArr = [];
    let images = e.target.files;
    for(let i = 0; i < images.length; i++) {
      imgArr.push(images[i]);
    }
    setProductData({...productData, images: imgArr});
  }
  const addProducts = async (e) => {
    e.preventDefault();
  try {
    let formData = new FormData();
    formData.append('name', productData.name);
    formData.append('image', productData.image);
    productData.images.forEach((img)=>{
     formData.append('images', img)
    })
   //  formData.append('images', productData.images);
    formData.append('price', productData.price);
    formData.append('currency', productData.currency);
    formData.append('quantity', productData.quantity);
    formData.append('category', productData.category);
    formData.append('discountPercentage', productData.discountPercentage);
    const { data } = await publicApi.post('/product/create', formData);
    console.log(data);
    if(data.message === 'Product added successfully!') {
      navigate('/')// This will take you to home page
    }
  } catch (error) {
    console.log(error);
  }
   }

   const getCategories = async () => {
    const { data } = await publicApi.get('/categories/');
    console.log(data)
    setCategories(data.data)
   }

   useEffect(() => {
    getCategories()
   }, []);
  return (
    <div>
        <Form onSubmit={addProducts}>
          <h1 style={styles.h1}>Add Product</h1>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Name</Form.Label>
            <Form.Control style={styles.input} type="text" required value={productData.name}
            onChange={(e) => setProductData({...productData, name: e.target.value})}/>
            <Form.Control.Feedback type='invalid'>please add name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Image</Form.Label>
            <Form.Control style={styles.input} type="file" required
            onChange={(e) => setProductData({...productData, image: e.target.files[0]})}/>
            <Form.Control.Feedback type='invalid'>please add Image</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Images</Form.Label>
            <Form.Control style={styles.input} type="file" required multiple
            onChange={(e) => saveFiles(e)}/>
            <Form.Control.Feedback type='invalid'>please add Images</Form.Control.Feedback>
          </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Price</Form.Label>
            <Form.Control style={styles.input} type="number" required value={productData.price}
            onChange={(e) => setProductData({...productData, price: e.target.value})}/>
            <Form.Control.Feedback type='invalid'>please add Price</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label style={styles.label}>Currency</Form.Label>
            <Form.Control style={styles.input} type="text" required value={productData.currency}
            onChange={(e) => setProductData({...productData, currency: e.target.value})}/>
            <Form.Control.Feedback type='invalid'>please add Currency</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Quantity</Form.Label>
            <Form.Control style={styles.input} type="text" required value={productData.quantity}
            onChange={(e) => setProductData({...productData, quantity: e.target.value})}/>
            <Form.Control.Feedback type='invalid'>please add quantity</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Category</Form.Label>
            {/* {
              productData.category?
              <>
                <p>
              {productData.category.map((item) => item + ' ')} 
            </p>
            <p style={{cursor: 'pointer'}} onClick={(e) => setProductData({...productData, category: []})}>Remove</p>
              </>
              : null
            } */}

                 {
                    productData.category.length > 0?
                    <>
                        <p>
                            {productData.category.map((item)=> item + ' ')}
                        </p>
                        <DeleteIcon style={{cursor: 'pointer'}} onClick={()  => setProductData({...productData, category: []})}/>
                    </>
                    : null
                 }
          


            {/* <Form.Control style={styles.input} type="text" required value={productData.category}
            onChange={(e) => setProductData({...productData, category: e.target.value})}/> */}
            <Form.Select onChange={(e) => setProductData({...productData, category: [...productData.category, 
            e.target.value]})}
            required>
              <option>Add category</option>
              {
                categories.map((category) => <option value={category.name}>{category.name}</option>)
              }
            </Form.Select>
            <Form.Control.Feedback type='invalid'>please add Category</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Discount Percentage</Form.Label>
            <Form.Control style={styles.input} type="text" value={productData.discountPercentage}
            onChange={(e) => setProductData({...productData, discountPercentage: e.target.value})}/>
            <Form.Control.Feedback type='invalid'>please add discount percentage</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Submit</Button> 
    </Form>
    </div>
  )
}

const styles = {}

export default AddProducts
