import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import Chart from '../chartjs/Chart';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import heart from './heart.png'
import grayHeart from './gray-heart.png'
import chart from './chart.png';
import {Doughnut} from 'react-chartjs-2';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
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




class Home extends Component {
    constructor() {
        super();
        this.state = {
            allChallenges: [],
            challenge_id: '',
            developer_id: '',
            imageURL: '',
            description: '',
            title: '',
            links: '',

            isLoading: true,
            isLiked: false,
            
        }
        this.addToLikes = this.addToLikes.bind(this);
    }

    

    componentDidMount() {
        
        axios
            .get('/api/challenges')
            .then(response => {
                const user = response.data
                for(let i=0; i < user.length; i++) {
                    
                    this.setState({
                        allChallenges: response.data,
                        challenge_id: user[i].challenge_id,
                        developer_id: user[i].developer_id,
                        imageURL: user[i].imageurl,
                        description: user[i].description,
                        title: user[i].title,
                        links: user[i].links,

                        isLoading: false
                    })
                }
            })
            
    }

    addToLikes(challenge){

        axios
            .put('/api/liked', {challenge_id: challenge.challenge_id})
            .then(response => {
                console.log(response)
                alert('Challenge added to likes')
            })
            .catch(err => {
                console.log(err)
            }) 
    }

    addToAccepted(challenge){
        axios
            .put('/api/accepted', {challenge_id: challenge.challenge_id})
            .then(response => {
                alert('Challenge accepted!')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return(
            <div className="row">
                <Navigation logOut={this.props.logOut}/>
                {this.state.isLoading
                    ?
                    <div className="loader">
                        <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </div>
                    :
                <div className='homeChallenges' >
                    <div className="challenge-header">
                        <h1 className='home-header' >Challenges</h1>
                    </div>
                    {this.state.allChallenges.map((challenge, index) => {
                        return (
                            <div className='challengeDisplay' key={index} >
                                <div className="challenge-image">
                                    <a href={challenge.imageurl} target="_blank" rel="noopener noreferrer"> <img className='challengeImg' src={challenge.imageurl} alt="uploaded-images"/></a>
                                </div>
                                <div className="challenge-options">
                                    <div className="challenge-descriptions">
                                        <h4>Title: {challenge.title}</h4>
                                        <p>Description: <br/>{challenge.description}</p>
                                        <p>External Links: <br/>{challenge.links}</p>
                                    </div>

                                    <div className="option-buttons">
                                            <button className='accept-button' onClick={() => {
                                                this.addToAccepted(challenge);
                                            }} >Accept</button>
                                            <button className='like-button' onClick={() => {
                                                this.addToLikes(challenge);
                                                this.setState({isLiked: true});
                                                console.log(this.state.isLiked)
                                                }} > <img src={grayHeart} alt="like-button"/> Like</button>
                                    </div>
                                </div>
                                
                                <div className="charts">
                                    <div className="charts-header">
                                        <h4>View Stats <img src={chart} alt="chart-icon"/></h4>
                                    </div>
                                    <div className="doughnut">
                                        <Chart />
                                    </div>
                                </div>
                                
                                <div className='ui-tools' >
                                    <h4>Tools</h4>
                                    <div className="tool-icons">
                                        <div className='ui-frameworks' >
                                            <h4>Framework/Library</h4>
                                            <i className="devicon-angularjs-plain"></i>
                                            <i className="devicon-react-original"></i>
                                            <i className="devicon-vuejs-plain"></i>
                                        </div>
                                        
                                        <div className='ui-stylers' >
                                            <h4>Stylers</h4>
                                            <i className="devicon-css3-plain"></i>
                                            <i className="devicon-sass-original"></i>
                                            <i className="devicon-less-plain-wordmark"></i>
                                        </div>
                                    </div>
                                        
                                </div>
                                
                            </div>
                        )
                    })}
                </div>
                }

                
            </div>
        )
    }
}

export default Home;