import React, { useState } from 'react'
import Reg_BG from '../Images/Register_BG.png';
import Icon from '../Images/icon.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [check, setCheck] = useState(false);


  const RegisterData = async (e) => {
    e.preventDefault();


    const response = await fetch('/Register-User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, password, c_password, check
      })
    });

    const data = response.json();

    if (response.status === 422 || !data) {
      window.alert("Can't registered user!");
    }
    else if(response.status === 201){
      window.alert("Registration successfull");
      navigate('/Login');
    }
  }


  return (
    <div className='auth-container'>
      <div className='sub-register-container'>
        <div className='left-register-container'>
          <img className='register-bg-image' src={Reg_BG} alt='reg-bg-img' />
        </div>
        <div>
          <div className='right-register-container'>
            <div style={{ "display": "flex", "alignItems": "center", "flexDirection": "column" }}>
              <img style={{ "paddingBottom": "10px" }} className='icon' src={Icon} alt='register-img' />
              <h2 style={{ "textAlign": "center", "paddingBottom": "5px" }}>Storyteller</h2>
              <p style={{ "textAlign": "center", "paddingBottom": "5px" }}>Create an free Account!</p>
            </div>
            <form method='POST' className='form-register-container'>
              <label className='label-register' >Name</label>
              <input value={name} onChange={(e) => { setName(e.target.value) }} className='label-register-inputs' type='text' />
              <label className='label-register' >Email Address</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='label-register-inputs' type='email' />
              <label className='label-register' >Password</label>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='label-register-inputs' type='password' />
              <label className='label-register' >Confirm Password</label>
              <input value={c_password} onChange={(e) => { setC_password(e.target.value) }} className='label-register-inputs' type='password' />
              <div className='checkbox'>
                <p>I agree with all Terms & Conditons</p>
                <input value={check} onChange={(e) => { setCheck(e.target.checked) }} type='checkbox'></input>
              </div>
              {
                check ? <button onClick={RegisterData} className='register-btn'>Create Account</button> : <button disabled onClick={RegisterData} style={{"backgroundColor":"darkgray"}} className='register-btn'>Create Account</button>
              }
            </form>
            <div className='already-auth'>
              <p style={{ "paddingBottom": "15px" }}>Already have an Account ?</p>
              <Link to='/Login' className='already-auth-btn'>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register