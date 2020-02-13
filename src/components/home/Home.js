import React, { Component } from 'react';
import Navigation from '../navigation/Navigation';
import Chart from '../chartjs/Chart';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import grayHeart from './gray-heart.png'
import chart from './chart.png';
import Responsive from '../navigation/Responsive'
import { Link } from 'react-router-dom';
// ReactModal.setAppElement('#el');





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

            modalIsOpen: false,
            isLoading: true,
            isLiked: false,

        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addToLikes = this.addToLikes.bind(this);
    }



    componentDidMount() {

        axios
            .get('/api/challenges')
            .then(response => {
                const user = response.data
                for (let i = 0; i < user.length; i++) {

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

    addToLikes(challenge) {

        axios
            .put('/api/liked', { challenge_id: challenge.challenge_id })
            .then(response => {
                alert('Challenge added to likes')
            })
            .catch(err => {
                console.log(err)
            })
    }

    addToAccepted(challenge) {
        axios
            .put('/api/accepted', { challenge_id: challenge.challenge_id })
            .then(response => {
                alert('Challenge accepted!')
            })
            .catch(err => {
                console.log(err)
            })
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }


    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        return (
            <div className="row">
                <Responsive />
                <Navigation logOut={this.props.logOut} />
                
                {this.state.isLoading
                    ?
                    <div className="loader">
                        <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </div>
                    :
                    <div className='homeChallenges' >


                        <div className="challenge-header">
                            <h1 className='home-header' >Challenge</h1>
                        </div>
                        {this.state.allChallenges.map((challenge, index) => {
                            return (
                                <div className='challengeDisplay' key={index} >
                                    <div className="challenge-image">
                                        <a href={challenge.imageurl} target="_blank" rel="noopener noreferrer"> <img className='challengeImg' src={challenge.imageurl} alt="uploaded-images" /></a>
                                    </div>
                                    <div className="challenge-options">
                                        <div className="challenge-descriptions">
                                            <h4>Title: {challenge.title}</h4>
                                            <p>Description: <br />{challenge.description}</p>
                                            <p>External Links: <br />{challenge.links}</p>
                                        </div>

                                        <div className="option-buttons">
                                            <button className='accept-button' onClick={() => {
                                                this.addToAccepted(challenge);
                                            }} >Accept</button>
                                            <button className='like-button' onClick={() => {
                                                this.addToLikes(challenge);
                                                this.setState({ isLiked: true });
                                            }} > <img src={grayHeart} alt="like-button" /> Like</button>
                                        </div>
                                    </div>

                                    <div className="charts">
                                        <div className="charts-header">
                                        </div>

                                        <div className="completed-stats">
                                            <Link className='link' to={{
                                                pathname: '/completed',
                                                state: {
                                                    challenge_id: challenge.challenge_id,
                                                    username: challenge.username,
                                                    links: challenge.links
                                                }
                                            }}>
                                                <h4>View Stats <img src={chart} alt="chart-icon" /></h4>

                                            </Link>
                                        </div>

                                        <div className="doughnut">

                                            <Chart id={challenge.challenge_id} />
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