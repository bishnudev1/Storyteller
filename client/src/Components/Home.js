import React from 'react'
import BG from '../Images/Home_BG.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='sub-home-container'>
                <section className='first-home-sec'>
                    <p style={{ "marginBlock": "0" }} className='home-head-text padding-10px'>Are you Story Lover ?</p>
                    <p className=' first-text padding-10px'>A secured OTT platform where you can write your daily life events and stories for others and you can read their stories too. Create your free account now and start uploading your stories, quotes, events,todos</p>
                    <Link to='/Post-A-Story' className='btn-home padding-10px'>Write a story</Link>
                </section>
                <section className='second-home-sec'>
                    <img className='home-bg-image' src={BG} alt='home-img' />
                </section>
            </div>
        </div>
    )
}

export default Home