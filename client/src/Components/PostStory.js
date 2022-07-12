import React, { useState, useEffect } from 'react'
import Publish_BG from '../Images/Publish_BG.png';
import { Link,useNavigate } from 'react-router-dom';

const PostStory = () => {

    
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    // const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const postnewstory = async (e) => {
        e.preventDefault();

        const response = await fetch('/Add-Story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title, name:user, desc
            })
        });

        const data = response.json();

        if (response.status === 422 || !data) {
            window.alert("Failed to add your story !");
        }
        else if (response.status === 201) {
            window.alert("Story has been added !");
            navigate('/Stories');
        }
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
        console.log(data.name);
        Setuser(data.name);
    }

    return (
        <div className='post-story-main-container'>
            <div className='sub-post-story-container'>
                <div className='right-post-sec'>
                    <img className='post-story-img' src={Publish_BG} alt='publish_img' />
                </div>
                <div className='left-post-sec'>
                    {
                        user === '' ?
                            <div className='sign-in-to-post-stories'>
                                <p className='sign-in-to-post-stories-head-text' >Sign In first to post Stories,Events,Quotes</p>
                                <Link style={{ "marginBlock": "10px", "backgroundColor": "darkviolet", "paddingBlock": "7px", "paddingInline": "25px", "color": "white" }} to='/Login'>Login Now</Link>
                            </div> :
                            <form className='post-story-form' method='POST'>
                                <label className='publish_post_labels'>Give a story title</label>
                                <input onChange={(e)=>setTitle(e.target.value)} value={title} className='publish_post_inputs' type='text' />
                                <label className='publish_post_labels'>What's the story</label>
                                <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='publish_post_inputs' type='text' />
                                <button style={{"backgroundColor":"blue","color":"white"}} onClick={postnewstory} className='publish_post_btn'>Publish Story</button>
                            </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostStory