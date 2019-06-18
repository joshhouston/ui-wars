import React from 'react';
import dashboard from './dashboard.png';
import heart from './heart.png';
import logout from './logout.png';
import add from './add.png';
import home from './home.png';



function Navigation(props) {
    return (
        <nav className='nav-main'>
            <ul className='nav-col'>
            <div className='nav-row'>
                        <img src={home} alt=""/>
                </div>

                <div className='nav-row'>
                        <img src={dashboard} alt=""/>
                </div>

                <div className="nav-row">
                        <img src={heart} alt=""/>
                 </div>

                <div className="nav-row">
                        <img src={add} alt=""/>
                </div>
            </ul>
                <button onClick={props.logOut} ><img src={logout} className='logout' alt=""/></button>
        </nav>
    )    
}

export default Navigation

