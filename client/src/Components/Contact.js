import React, { useState } from 'react'
import Contact_BG from '../Images/Contact_BG.png';
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');


  const ContactForm = async (e) => {
    e.preventDefault();


    const response = await fetch('/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, query
      })
    });

    const data = response.json();

    if (response.status === 422 || !data) {
      window.alert("Could post your feedback");
    }
    else if(response.status === 201){
      window.alert("Thanks for your valuable feedback");
      navigate('/');
    }
  }


  return (
    <div className='contact-container'>
      <p className='contact-head-text'>Feel free to ask anything</p>
      <div className='sub-contact-container'>
        <div className='left-contact-sec'>
          <form className='form-contact-style' method='POST'>
            <label className='contact-li-items'>Your Name</label>
            <input value={name} onChange={(e) => { setName(e.target.value) }} className='contact-inputs' type='text' />
            <label className='contact-li-items'>Your Email Adress</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='contact-inputs' type='email' />
            <label className='contact-li-items'>Your Query</label>
            <textarea value={query} onChange={(e) => { setQuery(e.target.value) }} className='contact-textarea' type='text'></textarea>
            <button onClick={ContactForm} className='contact-submit-btn'>Submit Query</button>
          </form>
        </div>
        <div className='right-contact-sec'>
          <img className='contact-form-img' src={Contact_BG} alt='contact-img' />
        </div>
      </div>
    </div>
  )
}

export default Contact;