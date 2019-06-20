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
            .get('/api/user/challenge')
            .then(response => {
                const user = response.data[0]
                this.setState({allChallenges: response.data})
            })
    }

    render(){
        return(
            <div className="home">
                <Navigation />
            </div>
        )
    }
}

export default Home;