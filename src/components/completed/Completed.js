import React, {Component} from 'react';
import axios from 'axios';

class Completed extends Component {
    constructor(){
        super();
        this.state = {
            developer_id:'',
            username: '',
            imageurl: '',
            links: '',
            description: ''
        }
    }

    componentDidMount() {
        axios
            .get('/api/user/challenge')
            .then(response => {
                const user1 = response.data[0];
                this.setState({
                    username: user1.username
                })
            })

        axios
            .get('/api/completed')
            .then(response => {
                const user = response.data[0]
                console.log(user)
                this.setState({
                    imageurl: user.imageurl,
                    links: user.links,
                    description: user.description
                })
            })
            
    }

    render(){
        return (
            <div className="completed">
                <h1>Username: {this.state.username}</h1>
                <a target="_blank" rel="noopener noreferrer" href={this.state.imageurl}><img className='challengeImg' src={this.state.imageurl} alt=""/></a>
            </div>
        )
    }
}

export default Completed;