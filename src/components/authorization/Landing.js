import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'



class Landing extends Component {
    constructor(){
        super()
        this.state = {

        }

    }

    render() {
        return (
            <div className='landing' >
                <div className="landing-header">
                    <h1>UI Wars</h1>
                </div>
                <div className="landing-buttons">
                    <div className="btn-contain">
                        <div className="btn-skew-contain">
                            <Link to='/login'>
                                <a href="http://mediamilitia.com" class="btn-skew">
                                <span className='nounder'>Login</span>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="btn-contain">
                    <div className="btn-skew-contain">
                        <Link to='/register'>
                            <a href="http://mediamilitia.com" class="btn-skew">
                            <span>Register</span>
                            </a>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;