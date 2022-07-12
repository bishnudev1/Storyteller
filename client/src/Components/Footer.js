import React from 'react'
// import Bishnudev from '../Images/Bishnudev.jpg';
import facebook from '../Images/facebook.png';
import github from '../Images/github.png';
import instagram from '../Images/instagram.png';
import portfolio from '../Images/portfolio.png';
import Icon from '../Images/icon.jpg';

const Footer = () => {
    return (
        <div className='main-footer-container'>
            <div className='left-foot-sec'>
                <img className='footer-main-img' src={Icon} alt='foot-main-img' />
                <p className='footer-text-item footer-head-text'>Storyteller</p>
            </div>
            <div style={{ "paddingBottom": "15px" }} className='mid-foot-sec'>
                <p className='footer-text-item footer-desc-text'>Copyright &copy; 2022 Storyteller.com</p>
            </div>
            <div style={{ "paddingBottom": "15px" }} className='right-foot-sec'>
                <ul className='footer-ul-items'>
                    <li onClick={() => window.location.href = 'https://github.com/bishnudev1'} className='footer-li-items'><img className='social-icons-footer' src={github} alt='foot-li-img' /></li>
                    <li onClick={() => window.location.href = 'https://www.instagram.com/bishnudev_ig/'} className='footer-li-items'><img className='social-icons-footer' src={instagram} alt='foot-li-img' /></li>
                    <li onClick={() => window.location.href = 'https://bishnudev20.herokuapp.com/'} className='footer-li-items'><img className='social-icons-footer' src={portfolio} alt='foot-li-img' /></li>
                    <li onClick={() => window.location.href = 'https://www.facebook.com/bishnudev.khutia.90'} className='footer-li-items'><img className='social-icons-footer' src={facebook} alt='foot-li-img' /></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer