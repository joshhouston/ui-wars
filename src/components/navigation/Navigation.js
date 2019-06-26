import React from 'react';
import dashboard from './dashboard.png';
import heart from './heart.png';
import logout from './logout.png';
import add from './add.png';
import home from './home.png';
import {Link} from 'react-router-dom';



function Navigation(props) {
    return (
        <nav className='nav-main'>
            <ul className='nav-col'>
            
                <Link to='/Home' >
                    <div className='nav-row'>
                            <img src={home} alt=""/>
                    </div>
                </Link>

                <Link to='/dashboard'>
                    <div className='nav-row'>
                            <img src={dashboard} alt=""/>
                    </div>
                </Link>

                <Link to='/liked'>
                    <div className="nav-row">
                            <img src={heart} alt=""/>
                    </div>
                </Link>
                
                <Link to='/challenge'>
                    <div className="nav-row">
                            <img src={add} alt=""/>
                    </div>
                </Link>
                <Link to='/'>
                    <button onClick={props.logOut} ><img src={logout} className='logout' alt=""/></button>
                </Link>
            </ul>
                
        </nav>
    )    
}

export default Navigation

