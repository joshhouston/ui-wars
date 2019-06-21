import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            allChallenges: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/challenges')
            .then(response => {
                const user = response.data[0]
                console.log(user)
                this.setState({allChallenges: response.data})
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
                                        <button>Like</button>
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