import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from '../../firebase-config';

firebase.initializeApp(firebaseConfig)


class Challenge extends Component {
    constructor() {
        super();
        this.state = {
            image: '',
            imageURL: '',
            progress: 0,
            userInfo: []
        }
        
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

        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }, () => {
                this.sendToDatabase();
            }))
    }
    
    sendToDatabase (){
        const newValues = {
            imageURL: this.state.imageURL
        }
        axios
            .put('/api/user', {newValues})
            .then(response => {
                const user = response.data[0]
                this.setState({imageURL: user.imageURL})
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    render() {
        console.log(this.state.imageURL)
        // console.log(this.state)
        return (
            <div className='row'>

                <Navigation />
                <div className='uploading'>
                    <FileUploader 
                        accept="image/*"
                        name='image'
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadSuccess={this.handleUploadSuccess}
                        className='uploader'
                    />
                {this.state.image && <img src={this.state.imageURL} />}
                </div>
                {/* <button type='file' className='addButton' >Upload</button> */}
            </div>
        )
    }
}

export default Challenge