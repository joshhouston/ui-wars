import React, {Component} from 'react';
import {Link} from 'react-router-dom';




class Landing extends Component {
    constructor(){
        super()
        this.state = {

        }

    }

    render() {
        return (
            <div>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/register' >
                    <button>Register</button>
                </Link>
            </div>
        )
    }
}

export default Landing;