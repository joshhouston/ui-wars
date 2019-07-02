import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from '../../firebase.js';
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
            tags: '',
            accepted: [],
            modalIsOpen: false,
            progress: 0,
            image: '',
            imageURL: '',
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
        console.log(this.state.language)
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
                        const user = response.data[0]
                        this.setState({accepted: response.data, challenge_id: user.challenge_id})
                        console.log(this.state)
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

    sendToComplete(e) {
        if(e){
            e.preventDefault();
        }

        const languages = {
            challenge_id: this.state.challenge_id,
            developer_id: this.state.developer_id
        }

        //Send to respective language table depending on language selected

        if(this.state.language === 'React') {
            axios
                .put('/api/react', {languages})
                .then( () => {
                   alert('submitted!')
                })
        } else if(this.state.language === 'Angular') {
            console.log('bangular')
        }

        // const newValues = {
        //     id: this.state.id,
        //     language: this.state.language,
        //     links: this.state.links,
        //     tags: this.state.tags
        // }

        // axios
        //     .put('/api/completed', {newValues})
        //     .then(response => {
        //         const user = response.data[0]
        //         this.setState({
        //             id: user.developer_id,
        //             language: user.language,
        //             links: user.links,
        //             tags: user.tags
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
                                    <form className='complete_challenge' >
                                    <div className='uploading'>
                                        {/* {this.state.image && <img className='uploaded-img' alt='uploaded-img' src={this.state.imageURL} />} */}
                                        Upload a photo/gif of your rendition
                                        <FileUploader 
                                            accept="image/*"
                                            name='image'
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
                                            placeholder='Enter github/codepen link..'
                                            name='github'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <input
                                            placeholder='Enter tags ex. ui ux mobile...'
                                            name='title'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <div className="form-button">
                                            <button className="accept-button" onClick={this.sendToComplete}>Submit</button> 
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