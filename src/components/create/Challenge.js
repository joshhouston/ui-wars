import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from '../../firebase.js';

firebase.initializeApp(firebaseConfig)


class Challenge extends Component {
    constructor() {
        super();
        this.state = {
            image: '',
            imageURL: '',
            progress: 0,
            id: '',
            description: '',
            links: '',
            test:'',
            challenges: []
        }
        this.sendToDatabase = this.sendToDatabase.bind(this)
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then(response => {
                const user = response.data[0]
                this.setState({challenges:response.data})
                this.setState({id: user.developer_id, description: user.description, links: user.links, imageURL: user.imageURL})
            })
            .catch(err => {
                console.log(err)
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

        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }))
    }
    
    sendToDatabase (e){
        if(e){
            e.preventDefault();
        }

        const newValues = {
            id: this.state.id,
            description: this.state.description,
            links: this.state.links,
            imageURL: this.state.imageURL
        }
        axios
            .put('/api/user', {newValues})
            .then(response => {
                const user = response.data[0]
                // console.log(user)
                this.setState({id: user.developer_id, description: user.description, links: user.links, imageURL: user.imageURL})
            })
            .catch(err => {
                console.log(err)
            })
            // console.log(this.state)
    }
    

    render() {
        
        // console.log(this.state)
        return (
            <div className='row'>

                <Navigation />

                <div className="columnForm">
                    <form className='challengeForm' >
                        
                        <input
                            placeholder='Enter a description...'
                            name='description'
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            placeholder='Enter external links...'
                            name='links'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </form>
                    <button onClick={this.sendToDatabase} >Submit</button>
                    
                    <div className='uploading'>
                        {this.state.image && <img alt='uploaded-img' src={this.state.imageURL} />}
                        <FileUploader 
                            accept="image/*"
                            name='image'
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadSuccess={this.handleUploadSuccess}
                            className='uploader'
                        />
                    </div>
                </div>
                
                
                {/* <div className="myChallenges">
                    {this.state.challenges.map((challenge, index) => {
                        return (
                            <div key={index} >
                                <h3>{challenge.description}</h3>
                                <h3>{challenge.links}</h3>
                            </div>
                        )
                    })} 
                </div> */}
            </div>
        )
    }
}

export default Challenge