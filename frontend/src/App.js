import logo from './logo.svg';
import './App.css';
import Home from './pages/user/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Practice from './pages/user/Practice';
import ProductDetails from './components/user/ProductDetails';
import Register from './pages/user/auth/Register';
import  Login from './pages/user/auth/Login';


function App() {
 
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path="/practice" element={<Home />} />
      <Route exact path="/" element={<Practice />} />
      <Route exact path="/practice/:id" element={<ProductDetails />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />

     </Routes>
    </div>
    </Router>
  );
}

export default App;
