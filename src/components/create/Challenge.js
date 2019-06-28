import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from '../../firebase.js';
import Loader from 'react-loader-spinner';

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
            title:'',
            challenges: [],

            isLoading: true
        }
        this.sendToDatabase = this.sendToDatabase.bind(this)
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then(response => {
                const user = response.data[0]
                this.setState({challenges:response.data})
                this.setState({id: user.developer_id, description: user.description, links: user.links, imageURL: user.imageURL, isLoading: false})
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
            imageURL: this.state.imageURL,
            title: this.state.title
        }
        axios
            .put('/api/user', {newValues})
            .then(response => {
                const user = response.data[0]
                // console.log(user)
                this.setState({id: user.developer_id, description: user.description, links: user.links, imageURL: user.imageURL, title: user.title})
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
                {this.state.isLoading
                    ?
                    <div className="loader">
                        <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </div>
                    :
                    <div className="columnForm">
                        <form className='challengeForm' >
                        <div className='uploading'>
                            {this.state.image && <img className='uploaded-img' alt='uploaded-img' src={this.state.imageURL} />}
                            <FileUploader 
                                accept="image/*"
                                name='image'
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadSuccess={this.handleUploadSuccess}
                                className='uploader'
                            />
                        </div>
                            <input
                                placeholder='Enter a title...'
                                name='title'
                                onChange={(e) => this.handleChange(e)}
                            />
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
                        <button onClick={this.sendToDatabase} >Submit</button>
                        </form>
                    </div>
                }

                
                
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