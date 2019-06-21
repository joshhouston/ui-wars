import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            allChallenges: [],
            challenge_id: '',
            developer_id: '',
            imageURL: '',
            description: ''
        }
        this.addToLikes = this.addToLikes.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/challenges')
            .then(response => {
                const user = response.data[0]
                console.log(user)
                this.setState({
                    allChallenges: response.data,
                    challenge_id: user.challenge_id,
                    developer_id: user.developer_id,
                    imageURL: user.imageurl,
                    description: user.description
                })
                // console.log(this.state.developer_id)
            })
    }

    addToLikes(){
        const likedValues = {
            challenge_id: this.state.challenge_id,
            developer_id: this.state.developer_id,
            imageURL: this.state.imageURL,
            description: this.state.description
        }

        
        axios
            .put('/api/liked', {likedValues})
            .then(response => {
                console.log('sup')
            })
            .catch(err => {
                console.log(err)
            }) 

    }

    render(){
        return(
            <div className="row">
                <Navigation />

                <div className='homeChallenges' >
                    {this.state.allChallenges.map((challenge, index) => {
                        return (
                            <div className='challengeDisplay' key={index} >
                                <img className='challengeImg' src={challenge.imageurl} alt="uploaded-images"/>
                                <div className="challenge-options">
                                    <h4>Title</h4>
                                    <div className="option-buttons">
                                        <button>Save</button>
                                        <button onClick={this.addToLikes} >Like</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Home;