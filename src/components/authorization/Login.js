import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.loginUser = this.loginUser.bind(this)

    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    loginUser() {
        axios
            .post('/auth/login', {username: this.state.username, password: this.state.password}).then(() => {
                this.setState({redirect: true}).catch(() => {alert('Login unsuccessful. Try again')})
            })
    }

    render() {
        if(this.state.redirect) {
            alert('Log in successful. Prepare for battle.')
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
                <h3>Login</h3>
                <div>
                    Username
                    <input placeholder='username' onChange={this.handleUsername} />
                    Password
                    <input placeholder='password' type='password' onChange={this.handlePassword} />

                </div>
                <button onClick={this.loginUser} >Login</button>
            </div>
        )
    }
}

export default Login;