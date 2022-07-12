import React, { useState, useEffect } from 'react'
import StoryCard from './StoryData/StoryCard'


const Stories = () => {

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

  return (
    <div className='main-stories-container'>
      <div className='welcome-user-sec'>
        {
          user === '' ? <p className='welcome-user-text'>Hello User! Create an Account to write Stories, Events, Blogs</p>: <p className='welcome-user-text'>Hello {user} ! It's good to see you back</p>
        }
      </div>
      <div className='sub-story-container'>
        <StoryCard />
      </div>
    </div>
  )
}

export default Stories