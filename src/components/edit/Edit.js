import React, {Component} from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseConfig from '../../firebase.js';


class Edit extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            profilePic: '',
            progress: 0,
            image: '',
            username: '',
            fullname: '',
            email: '',
            github: ''
        }
    }

    componentDidMount() {
        axios
            .get('/api/dashboard')
            .then(response => {
                const user = response.data[0]
                console.log(user)
                this.setState({
                    id: user.developer_id,
                    username: user.username,
                    fullname: user.full_name,
                    email: user.email,
                    github: user.github
                })
            })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
    }

    handleUploadStart = () => {
        this.setState({
            progress: 0
        })
    }

    handleUploadSuccess = filename => {
        this.setState({
            image: filename,
            progress: 100

        })

        firebase.storage().ref('profile-picture').child(filename).getDownloadURL()
            .then(url => this.setState({
                profilePic: url
            }))
    }

    editProfile(e){
        if(e) {
            e.preventDefault()
        }

        const newValues = {
            id: this.state.id,
            fullname: this.state.fullname,
            email: this.state.email,
            github: this.state.github,
            profilePic: this.state.profilePic
        }

        axios
            .put('/api/edit', {newValues})
            .then(() => {
                alert('edit complete!')
            })
    }

    render() {
        return(
            <div className='row' >
                <Navigation />
                <div className='edit-form'>
                    <form className='my-form' action="">
                        Upload Profile Picture:
                        <FileUploader 
                                accept="image/*"
                                name='image'
                                storageRef={firebase.storage().ref('profile-picture')}
                                onUploadStart={this.handleUploadStart}
                                onUploadSuccess={this.handleUploadSuccess}
                                className='uploader'
                            />
                        <div className="form-row">
                           
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                name='fullname'
                                onChange={(e) => this.handleChange(e)}
                            />
                            
                        </div>

                        <div className="form-row">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name='email'
                                onChange={(e) => this.handleChange(e)}
                            />
                            
                        </div>

                        <div className="form-row">
                            <TextField
                                id="outlined-basic"
                                label="Github"
                                variant="outlined"
                                name='github'
                                onChange={(e) => this.handleChange(e)}
                            />
                            
                        </div>
                        <Button onClick={(e) => this.editProfile(e)} variant='outlined'>Submit </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;