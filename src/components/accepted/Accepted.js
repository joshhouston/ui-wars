import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
// ReactModal.setAppElement('#el');
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Accepted extends Component {
    constructor() {
        super();
        this.state = {
            challenge_id: '',
            developer_id: '',
            language: 'React',
            links: '',
            description: '',
            accepted: [],
            modalIsOpen: false,
            progress: 0,
            image: '',
            reactMax: 0,
            imageURL: ''
        
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendToComplete = this.sendToComplete.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
    }

    handleSelect = event => {
        this.setState({ language: event.target.value})
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

        firebase.storage().ref('completed').child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }))
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false})
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then((response) => {
                const user2 = response.data[0]
                this.setState({developer_id: user2.developer_id})
                axios
                    .get('/api/user/accepted')
                    .then(response => {
                        const user = response.data
                        this.setState({accepted: response.data})
                        for(let i=0; i < user.length; i++) {
                            this.setState({
                                challenge_id: user[i].challenge_id,
                            })
                        }
                        
                    })
            })


    }

    withdraw(id) {
        return (
            axios
                .delete('/api/accepted/' + id)
                .then(() => {
                    alert('successfully removed challenge')
                    axios
                        .get('/api/user/accepted')
                        .then(response => {
                            this.setState({accepted: response.data})
                        })
                })
        )
    }

    sendToComplete(accepted) {
        const update = {
            challenge_id: this.state.challenge_id,
            reactMax: 0
        }
        
        const react = {
            challenge_id: this.state.challenge_id,
            developer_id: this.state.developer_id,
            reactMax: 0
        }

        const angular = {
            challenge_id: this.state.challenge_id,
            developer_id: this.state.developer_id,
            reactMax: 0
        }

        const vue = {
            challenge_id: this.state.challenge_id,
            developer_id: this.state.developer_id,
            reactMax: 0
        }

        // //Send to respective language table depending on language selected

        if(this.state.language === 'React') {
            axios
                .post('/api/react', {react})
                .then( () => {
                   alert('Submitted!')
                })
            axios
                .put('/api/react/one', {update})
                .then(() => {
                    this.closeModal()
                })
            
            const newValues = {
                    challenge_id: this.state.challenge_id,
                    developer_id: this.state.developer_id,
                    imageURL: this.state.imageURL,
                    links: this.state.links,
                    description: this.state.description,
                    tool: 1
                }    

            axios
                .put('/api/completed', {newValues})
                .then(response => {
                    const user = response.data[0]
                    this.setState({
                        challenge_id: user.challenge_id,
                        developer_id: user.developer_id,
                        imageURL: user.imageURL,
                        links: user.links,
                        description: user.description
                    })
                })
                .catch(err => {
                    console.log(err)
                })    

        } else if(this.state.language === 'Angular') {
            axios
                .put('/api/angular', {angular})
                .then( () => {
                    alert('Submitted!')
                })
            axios
                .put('/api/angular/one', {update})   
                .then(() => {
                    this.closeModal()
                }) 

                const newValues = {
                    challenge_id: this.state.challenge_id,
                    developer_id: this.state.developer_id,
                    imageURL: this.state.imageURL,
                    links: this.state.links,
                    description: this.state.description,
                    tool: 2
                }    

            axios
                .put('/api/completed', {newValues})
                .then(response => {
                    const user = response.data[0]
                    this.setState({
                        challenge_id: user.challenge_id,
                        developer_id: user.developer_id,
                        imageURL: user.imageURL,
                        links: user.links,
                        description: user.description
                    })
                })
                .catch(err => {
                    console.log(err)
                })    
        } else if(this.state.language === 'Vue') {
            axios
                .put('/api/vue', {vue})
                .then( () => {
                    alert('Submitted!')
                })
            axios
                .put('/api/vue/one', {update})
                .then(() => {
                    this.closeModal()
                })
                
                const newValues = {
                    challenge_id: this.state.challenge_id,
                    developer_id: this.state.developer_id,
                    imageURL: this.state.imageURL,
                    links: this.state.links,
                    description: this.state.description,
                    tool: 3
                }    

            axios
                .put('/api/completed', {newValues})
                .then(response => {
                    const user = response.data[0]
                    this.setState({
                        challenge_id: user.challenge_id,
                        developer_id: user.developer_id,
                        imageURL: user.imageURL,
                        links: user.links,
                        description: user.description
                    })
                })
                .catch(err => {
                    console.log(err)
                })    
        }    
    }
    

    render() {
        return (
            <div className='accepted' >
                {this.state.accepted.map((accepted, index) => {
                    return (
                        <div className="accepted_display" key={index}>
                            <img src={accepted.imageurl} alt="accepted-images" className='accepted_image' />
                            <div className="option-buttons">
                                <button className='accept-button' onClick={this.openModal}>Complete</button>
                                <button className='accept-button' onClick={ () => this.withdraw(accepted.challenge_id)} >Withdraw</button>
                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.state.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    overlayClassName='Overlay'
                                    >
                                    <form 
                                    onSubmit={e => {e.preventDefault()}}
                                    className='complete_challenge' >
                                    <div className='uploading'>
                                        Upload a photo/gif of your rendition
                                        <FileUploader 
                                            accept="image/*"
                                            name='imageURL'
                                            storageRef={firebase.storage().ref('completed')}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            className='uploader'
                                        />
                                    </div>
                                       <div className="form-title">
                                           What Framework/Library did you use?
                                           <div className="checkbox">
                                                <select value={this.state.language} onChange={this.handleSelect} >
                                                    <option>React</option>
                                                    <option>Angular</option>
                                                    <option>Vue</option>
                                                </select>
                                           </div>
                                           
                                        </div> 
                                        <input
                                            placeholder='Enter github/codepen link...'
                                            name='links'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <input
                                            placeholder='Description...'
                                            name='description'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <div className="form-button">
                                            <button className="accept-button" onClick={() => this.sendToComplete(accepted)}>Submit</button> 
                                            <button className='accept-button' onClick={this.closeModal} >close</button>  
                                        </div>
                                    </form>            
                                </Modal>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Accepted;