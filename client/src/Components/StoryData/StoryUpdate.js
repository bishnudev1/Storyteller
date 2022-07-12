import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Update_BG from '../../Images/Update_BG.png';


const StoryUpdate = () => {

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
    Setuser(data.name);
  }

  const navigate = useNavigate();

  const updateStory = (id) => {
    console.log(id);
    Axios.put(`/Update-Story`, {
      id: id,
      newtitle: newtitle,
      newdesc: newdesc
    });
    navigate('/Stories');
  }


  const [stories, setStories] = useState([]);


  useEffect(() => {
    fetch('/Stories').then((resp) => {
      resp.json().then((data) => {
        data.map((item) => {
          setStories(item);
        })
      })
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const [newtitle, setNewtitle] = useState("Enter new title...");
  const [newdesc, setNewdesc] = useState("Enter new story description...");

  return (
    <div className='update-story-from-container'>
      <div className='sub-update-story-from-container'>
        <div className='pic-container'>
          <img className='update-bg-img' src={Update_BG} alt='update-bg-img' />
        </div>
        {
          user === '' ? null : <div className='form-container'>
            <label className='update-story-labels' style={{ "paddingBlock": "10px" }}>New Title</label>
            <input className='update-story-inputs' value={newtitle} onChange={(e) => setNewtitle(e.target.value)} type='text' />
            <label className='update-story-labels' style={{ "paddingBlock": "10px" }}>New Story</label>
            <input className='update-story-inputs' value={newdesc} onChange={(e) => setNewdesc(e.target.value)} type='text' />
            <button className='update-story-btn' onClick={() => updateStory(stories._id)}>Update Story</button>
          </div>
        }
      </div>
    </div>
  )
}

export default StoryUpdate