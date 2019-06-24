import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

class Liked extends Component {
    constructor(){
        super();
        this.state = {
            myLikes: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then(response => {
                const user = response.data[0];
                console.log(user);
                axios
                    .get('/api/user/likes')
                    .then(response => {
                        console.log(response.data)
                        this.setState({myLikes: response.data})
                    })
            })

    //         .get('/api/user/likes')
    //         .then(response => {
    //             const likes = response.data[0]
    //             console.log(likes)
    //         })
    }

    render(){
        return (
            <div className="row">
                <Navigation />

                <div className="my-likes">
                    {this.state.myLikes.map((likes, index) => {
                        return (
                            <div className="challengeDisplay" key={index} >
                                <img src={likes.imageurl} alt="liked-images" className="challengeImg"/>
                                <div className="challenge-options">
                                    <h4>Title: {likes.description} </h4>
                                    <div className="option-buttons">
                                        <button>Unlike</button>
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

export default Liked;