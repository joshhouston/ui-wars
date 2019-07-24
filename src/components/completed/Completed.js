import React, {Component} from 'react';
import axios from 'axios';

class Completed extends Component {
    constructor(props){
        super(props);
        this.state = {
            completed: []
        }
    }

    componentDidMount() {
        
        // axios
        //     .get('/api/user/challenge')
        //     .then(response => {
        //         const user1 = response.data[0];
        //         this.setState({
        //             username: user1.username
        //         })
        //     })

        axios
            .get(`/api/completed/${this.props.challenge}`)
            .then(response => {
                const user = response.data
                 this.setState({completed: response.data})
                // this.setState({
                //     imageurl: user.imageurl,
                //     links: user.links,
                //     description: user.description
                // })
            })
            
    }

    render(){
        return (
            <div className="completed">
            {this.state.completed.map((completed, index) => {
                return (
                    <div key ={index} className="completed-user">
                        <h1>Username: {completed.username}</h1>
                        <p>Github</p>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Completed;