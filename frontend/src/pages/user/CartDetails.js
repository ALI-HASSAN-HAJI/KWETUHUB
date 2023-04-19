import React, {useState, useEffect} from 'react';
import Navbar from '../../components/user/NavBar';
import privateApi from '../../api/privateApi';
import DeleteIcon from '@mui/icons-material/Delete';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;//it should come from .env file and it shouldn't imported above and should not installed
  const getCartItems = async () => {
    const { data } = await privateApi.get('/cart/getitems');
    // console.log(data);
    setCartItems(data.data);
  };
  // This the sum of one product;
  const getTotalAmount = () =>{
    let sum = 0;
    for(let i =0; i< cartItems.length; i++){
        let individualSum = cartItems[i].price * cartItems[i].quantity;
        sum = individualSum + sum;
    }
    return sum;
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
      <div>
        <img alt={cartItem.name} src={backendUrl + cartItem.image} />
        <p>{cartItem.name}</p>
        <p>{cartItem.currency} {cartItem.price * cartItem.quantity}</p>
        <button>+</button>
        <p>{cartItem.quantity}</p>
        <button>-</button>
        <DeleteIcon />
      </div>
    )
   })

}

<p>{getTotalAmount()}</p>
    </div>
    </>
  )
}
export default CartDetails;