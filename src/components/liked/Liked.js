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
            })
    }

    render(){
        return (
            <div className="row">
                <Navigation />

                <div className="my-likes">
                    test
                </div>
            </div>
        )
    }
}

export default Liked;