import React from 'react';



function Navigation(props) {
    return (
        <nav className='nav-main'>
            <ul>
                <li>Home</li>
                <button onClick={props.logOut} >Logout</button>
            </ul>
        </nav>
    )    
}

export default Navigation

