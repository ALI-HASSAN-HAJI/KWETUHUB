import axios from 'axios';
import Cookies from 'js-cookie';


let token = Cookies.get('token')

export default axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})