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
            profilePic: '',
            progress: 0,
            image: ''
        }
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
                            Change Name:
                            <input
                                className='form-inputs'
                                placeholder='Change name...'
                                name='description'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;