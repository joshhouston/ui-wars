import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
                
                    <div className="registration-form">
                        Register
                        <TextField
                                id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                onChange={this.handleFullName}
                            />
                        {/* <input className='login-input' onChange={this.handleFullName} placeholder='Full Name' /> */}
                        <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                onChange={this.handleUsername}
                            />
                        {/* <input className='login-input' onChange={this.handleUsername} placeholder='Username' /> */}
                        <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={this.handlePassword}
                            />
                        {/* <input className='login-input' onChange={this.handlePassword} placeholder='Password' type='password' /> */}
                        <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={this.handleEmail}
                            />
                        {/* <input className='login-input' onChange={this.handleEmail} placeholder='Email' type='email' /> */}

                        <Button onClick={this.registerDeveloper} variant='outlined'>Register </Button>
                        
                </div>
            </div>
        )
    }
}

export default Registration;