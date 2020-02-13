import React from 'react';

import {Link} from 'react-router-dom';



function Navigation(props) {
    return (
        <nav className='nav-main'>
            <ul className='nav-col'>
            
                <Link to='/Home' >
                    <div className='nav-row'>
                            
                           <p>Home</p>
                    </div>
                </Link>

                <Link to='/dashboard'>
                    <div className='nav-row'>
                            
                            <p> Dashboard</p>
                    </div>
                </Link>

                <Link to='/liked'>
                    <div className="nav-row">
                            
                            <p>Likes</p>
                    </div>
                </Link>
                
                <Link to='/challenge'>
                    <div className="nav-row">
                            
                            <p>Create</p>
                    </div>
                </Link>
                <Link to='/landing'>
                    <div className="nav-row">
                        <p onClick={props.logOut} >Logout</p>
                    </div>
                </Link>
            </ul>
        </nav>
    )    
}

export default Navigation

