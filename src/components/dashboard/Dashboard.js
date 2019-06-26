import React, {Component} from 'react';
import Navigation from '../navigation/Navigation'
import axios from 'axios'
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Redirect} from 'react-router-dom';
import edit from './edit-icon.png';
import {Link} from 'react-router-dom';


class Dashboard extends Component {
    constructor() {
        super();
        this.state ={
            redirect: false,
            username: ''
        }
        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        axios
            .get('/api/dashboard')
            .then(response => {
                const user = response.data[0]
                this.setState({username: user.username})
            })
    }

    logOutUser() {
        axios
            .post('/auth/logout').then(res => {
                console.log(res.data)
            })
    }

    render() {
        // if(!this.props.user) {
        //     this.setState({redirect: true})
        // }
        // if(this.state.redirect) {
        //     alert('please login')
        //     return <Redirect to='/' />
        // }
        return (

            <div className='dashboard'>
                <Navigation logOut={this.logOutUser} />
            
                <div className="dashMain">
                    <div className="dashHeader">
                        <div className="profile-picture">
                            <img src="https://via.placeholder.com/150" alt=""/>
                        </div>

                        <div className="profile-info">
                            <h2>Username: {this.state.username}</h2>
                            <h3>Member Since: </h3>
                            <h3>Profiles: <i className="devicon-github-plain"></i></h3>
                        </div>

                        <div className="profile-stats">
                            <h3>Following: 0</h3>
                            <h3>Followers: 0</h3>
                            <h3>Posts Liked: 2</h3>
                        </div>

                        <div className="edit-icon">
                            <Link to='/edit'>
                                <img src={edit} title='Edit Profile' alt="edit-button"/>
                            </Link>
                        </div>

                    </div>

                    <div className="my-challenges">

                    </div>
                </div>

                {/* <button onClick={this.logOutUser} >Logout</button> */}
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState
    return {
        user
    }
}

export default connect (
    mapStateToProps,
    {getUser}
)(Dashboard)