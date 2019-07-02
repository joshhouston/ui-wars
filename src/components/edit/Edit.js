import React, {Component} from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
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
                            Name:
                            <input
                                className='form-inputs'
                                placeholder={this.state.fullname}
                                name='fullname'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>

                        <div className="form-row">
                            Email:
                            <input
                                className='form-inputs'
                                placeholder={this.state.email}
                                name='email'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>

                        <div className="form-row">
                            Github:
                            <input
                                className='form-inputs'
                                placeholder={this.state.github}
                                name='github'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    <button onClick={(e) => this.editProfile(e)} >Submit Changes</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;