import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                this.setState({redirect: true})
            })
            .catch(() => alert('Login unsuccessful. Try again'))
    }

    render() {
        if(this.state.redirect) {
            alert('Log in successful. Prepare for battle.')
            return <Redirect to='/dashboard' />
        }
        return (
            <div className='login'>
                
                <div className='login-form' >
                    Login
                    <TextField 
                        id="outlined-basic"
                        label="Username"
                        variant="outlined" 
                        onChange={this.handleUsername} 
                    />
                    <TextField 
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined" 
                        onChange={this.handlePassword} 
                    />
                <Button onClick={this.loginUser} variant='contained' color="primary">Login </Button>
                
                </div>
            </div>
        )
    }
}

export default Login;