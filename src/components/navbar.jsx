import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      padding: '10px', 
      backgroundColor: ' rgb(116, 29, 29)', 
      boxShadow: '0px 4px 6px rgba(239, 234, 234, 0.1)' ,
      fontSize:'24px',
      fontFamily:'monospace'
       
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
      <Link to="/Product" style={{ textDecoration: 'none', color: 'white' }}>Product</Link>
      <Link to="/Addproduct" style={{ textDecoration: 'none', color: 'white' }}>Add Product</Link>
      <Link to="/Login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
    </div>
  );
}

export default Navbar;
