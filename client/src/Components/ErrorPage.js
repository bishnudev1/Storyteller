import React from 'react'
import ErrorImage from '../Images/404.png';

const ErrorPage = () => {
    return (
        <div className='error-container-main'>
            <img className='error-img-404' src={ErrorImage} alt='error-img' />
        </div>
    )
}

export default ErrorPage