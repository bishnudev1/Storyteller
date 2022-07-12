import React, { useEffect, useState } from 'react'
import Story_BG from '../../Images/Story_BG.png';
import { Link } from 'react-router-dom';
// import Stories from './Storydata';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoryCard = () => {
    const navigate = useNavigate();

    const deleteStory = (id) => {
        Axios.delete(`/Delete-Story/${id}`)
        window.alert("Story has been deleted");
        navigate('/Post-A-Story');
    }


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

    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch('/Stories').then((resp) => {
            resp.json().then((data) => {
                setStories(data);
            })
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            {
                stories.map((item, i) => {
                    return (
                        <>
                            <div className='story-card' key={i}>
                                <h3 className='common-padding stories-id'>{item._id}</h3>
                                <img className='common-padding stories-img' src={Story_BG} alt='story-img' />
                                <p className='common-padding stories-title'>{item.title}</p>
                                <p className='common-padding stories-desc'>{item.desc}</p>
                                <div className='user-desc'>
                                    <p className='user-desc-text'>{item.time}</p>
                                    <p className='user-desc-text'>{item.name}</p>
                                </div>
                                {
                                    user === item.name ? <div className='up-del-story-container'>
                                        <Link className='up-story-btn' to='/Update-Your-Story'>Update</Link>
                                        <button onClick={() => deleteStory(item._id)} className='del-story-btn' to='/Delete-Your-Story'>Delete</button>
                                    </div> : null
                                }
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default StoryCard