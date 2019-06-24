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
                const user = response.data
                for(let i=0; i < user.length; i++) {
                    
                    this.setState({
                        allChallenges: response.data,
                        challenge_id: user[i].challenge_id,
                        developer_id: user[i].developer_id,
                        imageURL: user[i].imageurl,
                        description: user[i].description
                    })
                }
                // console.log(user)
                // this.setState({
                //     allChallenges: response.data
                //     // challenge_id: user.challenge_id,
                //     // developer_id: user.developer_id,
                //     // imageURL: user.imageurl,
                //     // description: user.description
                // })
                
                
            })
    }

    addToLikes(challenge){
        // const likedValues = {
        //     challenge_id: this.state.challenge_id,
        //     developer_id: this.state.developer_id,
        //     imageURL: this.state.imageURL,
        //     description: this.state.description
        // }

        // const c_ID = [];
        // const challenges = this.state.allChallenges
        // // console.log(challenge)
        // for(let i=0; i < challenges.length; i++){
        //     c_ID.push(challenges[i].challenge_id)
        // }
        // console.log(c_ID)

        
        

        
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
                                    <h4>Title: {challenge.description}</h4>
                                    <div className="option-buttons">
                                        <button>Save</button>
                                        <button onClick={() => this.addToLikes(challenge)} >Like</button>
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