import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <div className='navdiv'>
        <ul>
            <Link to='/Contact'>Contact me</Link>   
            {/* "contact me " la connect karto /contact path la means contact me la touch kele ki navigate hoto contact page var */}
            <Link to='/About'>About</Link>
            
            
        </ul>
    </div>
    </>
    
    
  )
}

export default Navbar