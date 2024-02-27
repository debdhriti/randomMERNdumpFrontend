import { useState, useEffect } from 'react'
import './App.css'
import { Button } from "@material-tailwind/react"
import FoodNavbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Payment from './Components/Payment';
import Orders from './Components/Orders';
import { REACT_APP_BACKEND_BASE } from './Components/services/api';


function App() {
  const [orders, SetOrders] = useState({});
  const [cart, SetCart] = useState({});
  const [authorized, SetAuthorized] = useState(false);
  const [search, SetSearch] = useState("");
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fillCart = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${REACT_APP_BACKEND_BASE}/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json();
      console.log(data.cart)
      if (data.cart) {
        SetCart(data.cart);
      }
    }
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${REACT_APP_BACKEND_BASE}/authenticate`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data)
      if (data.loggedIn) {
        SetAuthorized(data.loggedIn)
        fillCart()
      } else {
        SetAuthorized(false)
      }
      if (data.message) {
        console.log(data.message)
      }
    }

    checkLoggedIn()
  }, [])
  return (
    <>
      <FoodNavbar loggedIn={authorized} SetLoggedIn={SetAuthorized} search={{ search, SetSearch }} cart={cart} open={{ open, setOpen }} orders={{ orders, SetOrders }}></FoodNavbar>
      <Routes>
        <Route path='/' element={<Home orders={{ orders: orders, SetOrders }} cart={{ cart: cart, SetCart: SetCart }} search={search} open={{ open, setOpen }} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login SetLoggedIn={SetAuthorized} />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>


    </>
  )
}

export default App
