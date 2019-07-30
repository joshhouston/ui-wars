import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button'


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
            <div className='registration' >
                <h3 className='login-header' >Register </h3>
                
                    <div className="registration-form">
                        Full Name
                        <input className='login-input' onChange={this.handleFullName} placeholder='Full Name' />
                        Username
                        <input className='login-input' onChange={this.handleUsername} placeholder='Username' />
                        Password
                        <input className='login-input' onChange={this.handlePassword} placeholder='Password' type='password' />
                        Email
                        <input className='login-input' onChange={this.handleEmail} placeholder='Email' type='email' />

                        <Button onClick={this.registerDeveloper} variant='outlined'>Register </Button>
                        
                </div>
            </div>
        )
    }
}

export default Registration;