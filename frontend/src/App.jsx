import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx';
import Cart from '../src/pages/Cart/Cart.jsx';
import PlaceOrder from '../src/pages/PlaceOrder/PlaceOrder.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { LoginPopUp } from './components/LogInPopUp/LoginPopUp.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';

const App = () => {
  const [showlogin,setShowLogin]=useState(false);
  return (
    <>
    {showlogin ? <LoginPopUp setShowLogin={setShowLogin}/> :<></>}
    <div className='app'>
      <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/cart'  element={<Cart/>}/>
        <Route path='/order'  element={<PlaceOrder/>}/>
        <Route path='/verify'  element={<Verify/>}/>
        <Route path='/myorders'  element={<MyOrders/>}/>
      </Routes>
    </div>
      <Footer/>
      </>
  )
}

export default App