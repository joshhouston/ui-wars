import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';


class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: []
        }
    }

    componentDidMount() {
        this.getChallenge(this.props.location.state.challenge_id)
    }

    getChallenge = (id) => {
        if (id) axios
            .get(`/api/completed/${id}`)
            .then(response => {
                this.setState({ completed: response.data })
            })
    }


    render() {
        return (
            <div className="row">
                <Navigation logOut={this.props.logOut} />

                <div className="completed-users">
                    <div className="challenge-header">
                        <h1 className='home-header' >Completed</h1>

                    </div>
                    {this.state.completed.map((completed, index) => {
                       if(completed.tool === 1){
                        return (
                            <div className="completed-user">
                                <img src={completed.profile_picture} alt="" />
                                <h1>Username: {completed.username}</h1>
                                <p>Github: <a href={completed.links} target="_blank" rel="noopener noreferrer">{completed.links}</a></p>
                                <p>Tool Used: React</p>
                            </div>
                        )
                       }else if(completed.tool === 2){
                        return (
                            <div className="completed-user">
                                <img src={completed.profile_picture} alt="" />
                                <h1>Username: {completed.username}</h1>
                                <p>Github: <a href={completed.links} target="_blank" rel="noopener noreferrer">{completed.links}</a></p>
                                <p>Tool Used: Angular</p>
                            </div>
                        )
                       }else if(completed.tool === 3){
                        return (
                            <div className="completed-user">
                                <img src={completed.profile_picture} alt="" />
                                <h1>Username: {completed.username}</h1>
                                <p>Github: <a href={completed.links} target="_blank" rel="noopener noreferrer">{completed.links}</a></p>
                                <p>Tool Used: Vue</p>
                            </div>
                        )
                       }
                    })}
                </div>
            </div>
        )
    }
}

export default Completed;