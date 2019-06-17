import React, {Component} from 'react';



class Login extends Component {
    constructor(){
        super()
        this.state = {

        }

    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <div>
                    Username
                    <input placeholder='username' />
                    Password
                    <input placeholder='password' type='password' />
                    
                </div>
            </div>
        )
    }
}

export default Login;