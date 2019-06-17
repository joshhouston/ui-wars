import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            redirect: false

        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.registerDeveloper = this.registerDeveloper.bind(this);
    }

    handleUsername(e) {
        this.setState({username:e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }
    registerDeveloper() {
        axios
            .post('/auth/registerDeveloper', {username: this.state.username, password: this.state.password, email: this.state.email}).then(() => {
                this.setState({redirect: true}).catch(() => {alert('Registration unsuccessful.')})
            })
    }

    render() {
        if(this.state.redirect) {
            alert('Registration successful. Please log in')
            return <Redirect to='/login' />
        }
        return (
            <div>
                <h3>Register a New Account</h3>
                <div>
                    Username
                    <input onChange={this.handleUsername} placeholder='username' />
                    Password
                    <input onChange={this.handlePassword} placeholder='password' type='password' />
                    Email
                    <input onChange={this.handleEmail} placeholder='email' />
                </div>
                <button onClick={this.registerUser} >Register</button>
            </div>
        )
    }
}

export default Registration;