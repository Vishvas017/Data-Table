import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Product from '../components/Product';
import Addproduct from '../components/Addproduct';
import Login from '../components/Login'
// import Privatepage from '../components/Privatepage';
function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Product" element={
         <Product/>
        
        } />
        <Route path="/AddProduct" element={<Addproduct/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default Allroutes;
