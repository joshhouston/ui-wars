import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';

class Liked extends Component {
    constructor(){
        super();
        this.state = {
            myLikes: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then( () => {
                axios
                    .get('/api/user/likes')
                    .then(response => {
                        this.setState({myLikes: response.data, isLoading: false})
                    })
            })
    }

    deleteLikes(id) {
        return (
            axios
                .delete('/api/likes/' + id)
                .then(() => {
                    axios
                    .get('/api/user/likes')
                    .then(response => {
                        this.setState({myLikes: response.data})
                    })
                
                })
        )
       
    }

    render(){
        return (
            <div className="row">
                <Navigation />
                
                {this.state.isLoading
                    ?
                    <div className="loader">
                        <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </div>
                    :
                    
                    <div className="my-likes">
                        
                        {this.state.myLikes.map((likes, index) => {
                            return (
                                <div className="like-display" key={index} >
                                    <img src={likes.imageurl} alt="liked-images" className="challengeImg"/>
                                    <div className="like-options">
                                        <h4>Title: {likes.description} </h4>
                                        <div className="option-buttons">
                                        <Button 
                                        onClick={() => this.deleteLikes(likes.challenge_id)}
                                        color="secondary">
                                            Unlike
                                        </Button>
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

export default Liked;