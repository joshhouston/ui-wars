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
            fullname: '',
            redirect: false

        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFullName = this.handleFullName.bind(this);
        this.registerDeveloper = this.registerDeveloper.bind(this);
    }

    handleUsername(e) {
        this.setState({username:e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleFullName(e) {
        this.setState({fullname: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }
    registerDeveloper() {
        axios
            .post('/auth/registerDeveloper', {username: this.state.username, password: this.state.password, email: this.state.email, fullname: this.state.fullname }).then(() => {
                this.setState({redirect: true})
            })
            .catch(() => {alert('Registration unsuccessful.')})
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
                    Full Name
                    <input onChange={this.handleFullName} placeholder='Full Name' />
                    Username
                    <input onChange={this.handleUsername} placeholder='Username' />
                    Password
                    <input onChange={this.handlePassword} placeholder='Password' type='password' />
                    Email
                    <input onChange={this.handleEmail} placeholder='Email' type='email' />
                </div>
                <button onClick={this.registerDeveloper} >Register</button>
            </div>
        )
    }
}

export default Registration;