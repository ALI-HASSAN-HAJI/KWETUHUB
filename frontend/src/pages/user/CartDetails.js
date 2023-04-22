import React, {useState, useEffect} from 'react';
import Navbar from '../../components/user/NavBar';
import privateApi from '../../api/privateApi';
import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CheckoutModal from '../../components/user/CheckoutModal';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;//it should come from .env file and it shouldn't imported above and should not installed
  const getCartItems = async () => {
    const { data } = await privateApi.get('/cart/getitems');
    // console.log(data);
    setCartItems(data.data);
  };
  // This the sum of one product;
  const getTotalAmount = () => {
    let sum = 0;
    for(let i = 0; i< cartItems.length; i++) {
        let individualSum = cartItems[i].product.price * cartItems[i].cartQuantity;
        sum = individualSum + sum;
    }
    return sum;
  }

  const removeFromCart = async (id) => {
   const { data } = await privateApi.post(`/cart/remove/${id}`)
   console.log(data);
   getCartItems();
  }

  useEffect(() => {
    getCartItems()
  }, []);
  return (
    <>
    <Navbar />
    <div>
      

{
   cartItems.map((cartItem) => {
    return(
      <div style={styles.cont}>
        <img style={styles.img} alt={cartItem.product.name} src={backendUrl + cartItem.product.image} />
        <p style={styles.ptag}>{cartItem.product.name}</p>
        <p style={styles.ptag}>{cartItem.product.currency} {cartItem.product.price * cartItem.cartQuantity}</p>
        <p style={styles.ptag}>{cartItem.cartQuantity}</p>
        <DeleteIcon 
        style={styles.delete} onClick={() => removeFromCart(cartItem.product._id)}/>
      </div>
    )
   })

}

{
  cartItems.length !== 0?
  <>
  <p style={styles.total}>Total: ksh {getTotalAmount()}</p>
  {/* <button style={styles.primaryBtn}>proceed to checkout <ArrowRightAltIcon /></button> */}
  <CheckoutModal />
  </>
  : 
  <>
  <p style={styles.total}>There is nothing in your cart.<br/>Go to home page to browse items:
  <a href='/'>link</a></p>
  </>
}

    </div>
    </>
  )
}

const styles = {
  cont: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   margin: '25px',
   border: '1px solid black',
   borderRadius: '15px'
  },
  ptag: {
   padding: '20px',
   margin: 0,
  },
  delete: {
  },
  img: {
   height: '70px',
   width: '70px',
   margin: '3px'
  },
  total: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
}
export default CartDetails;