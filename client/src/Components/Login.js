import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Reg_BG from '../Images/Register_BG.png';
import Icon from '../Images/icon.jpg'
import { Link } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginData = async (e) => {
    e.preventDefault();

    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 422) {
      window.alert("Wrong user details!");
    }
    else {
      navigate('/Stories');
      window.location.reload();
    }

  }

  return (
    <div className='auth-container'>
      <div className='sub-register-container login-toggle-height'>
        <div className='left-register-container'>
          <img className='register-bg-image' src={Reg_BG} alt='login-img' />
        </div>
        <div>
          <div className='right-register-container'>
            <div style={{ "display": "flex", "alignItems": "center", "flexDirection": "column" }}>
              <img style={{ "paddingBottom": "10px" }} className='icon' src={Icon} alt='icon-img' />
              <h2 style={{ "textAlign": "center", "paddingBottom": "5px" }}>Storyteller</h2>
              <p style={{ "textAlign": "center", "paddingBottom": "5px" }}>Log in to your Account!</p>
            </div>
            <form method='POST' className='form-register-container'>
              <label className='label-register' >Email Address</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='label-register-inputs' type='email' />
              <label className='label-register' >Password</label>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='label-register-inputs' type='password' />
              <button onClick={loginData} className='register-btn'>Sign In</button>
            </form>
            <p style={{ "textAlign": "right", "paddingRight": "25px", "paddingBottom": "10px", "color": "#999" }}>Forget ?</p>
            <div className='already-auth'>
              <p style={{ "paddingBottom": "15px" }}>Does not have an Account ?</p>
              <Link to='/Register' className='already-auth-btn'>Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login