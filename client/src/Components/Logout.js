import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/Logout-User', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(() => {
            navigate('/Login');
            window.location.reload();
        }).catch((error) => console.log(error));
    })

    return (
        <div>
            Logout Successfully
        </div>
    )
}

export default Logout