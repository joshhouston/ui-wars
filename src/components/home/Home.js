import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import heart from './heart.png'
import grayHeart from './gray-heart.png'
import {Doughnut} from 'react-chartjs-2';
const data = {
    labels: [
        'React',
        'Vue',
        'Angular'
    ],
    datasets: [{
        data: [10, 20, 14],
    backgroundColor: [
        '#61DAFB',
        '#41B883',
        '#DD1B16'
    ],
    borderColor: [
        '#61DAFB',
        '#41B883',
        '#DD1B16'
    ],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    }]
    
}



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
            isLiked: false
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
                    {this.state.allChallenges.map((challenge, index) => {
                        return (
                            <div className='challengeDisplay' key={index} >
                               <a href={challenge.imageurl} target="_blank" rel="noopener noreferrer"> <img className='challengeImg' src={challenge.imageurl} alt="uploaded-images"/></a>
                                <div className="challenge-options">
                                    <h4>Title: {challenge.title}</h4>
                                    <p>Description: <br/>{challenge.description}</p>
                                    <p>External Links: <br/>{challenge.links}</p>

                                    <div className="option-buttons">
                                            <button className='accept-button' onClick={() => {
                                                this.addToAccepted(challenge);
                                            }} >Accept</button>
                                            <button className='like-button' onClick={() => {
                                                this.addToLikes(challenge);
                                                this.setState({isLiked: true});
                                                console.log(this.state.isLiked)
                                                }} > <img src={grayHeart} alt="like-button"/>  Like</button>
                                    </div>
                                </div>
                                
                                <div className="charts">
                                    <Doughnut
                                        data={data}
                                    />
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