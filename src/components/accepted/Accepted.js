import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// ReactModal.setAppElement('#accepted_display');
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
            accepted: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then(() => {
                axios
                    .get('/api/user/accepted')
                    .then(response => {
                        console.log(response.data)
                        this.setState({accepted: response.data})
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
                                        <input
                                            name='title'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <input
                                            name='title'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                        <input
                                            name='title'
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                      <button onClick={this.closeModal} >close</button>  
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