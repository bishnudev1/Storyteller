import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { UserContext } from '../App';


const Navbar = () => {

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);


  const [user, Setuser] = useState('');

  const getData = async () => {
    const res = await fetch('/About', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data.name);
    Setuser(data.name);
  }

  const RenderNavbar = () => {
    if (user) {
      return (
        <>
          <Link className='li-items' to='/'>Home</Link>
          <Link className='li-items' to='/Stories'>Stories</Link>
          <Link className='li-items' to='/Contact'>Contact Us</Link>
          <Link className='li-items' to='/Logout'>Logout</Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link className='li-items' to='/'>Home</Link>
          <Link className='li-items' to='/Stories'>Stories</Link>
          <Link className='li-items' to='/Contact'>Contact Us</Link>
          <Link className='li-items' to='/Register'>Register</Link>
        </>
      )
    }
  }
  return (
    <div className='navbar'>
      <div className='left-nav'>
        <h2 className='nav-head-text'>Storyteller</h2>
      </div>
      <div className='right-nav'>
        <ul className='nav-right-items'>
          <RenderNavbar />
        </ul>
      </div>
    </div>
  )
}

export default Navbar